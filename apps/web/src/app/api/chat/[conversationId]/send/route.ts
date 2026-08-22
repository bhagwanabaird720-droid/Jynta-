import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { query } from '@jynta/database';
import { verifyToken } from '@/lib/auth/authClient';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

async function getUserId(req: NextRequest) {
  const token = req.cookies.get('jynta_session')?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  return payload?.userId || null;
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ conversationId: string }> }
) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { conversationId } = await context.params;
  const { message } = await req.json();

  if (!message) return NextResponse.json({ error: 'Message is required' }, { status: 400 });

  await query(
    'INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3)',
    [conversationId, 'user', message]
  );

  const history = await query(
    'SELECT role, content FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC',
    [conversationId]
  );

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const chatHistory = history.slice(0, -1).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({ history: chatHistory });
  const result = await chat.sendMessage(message);
  const aiText = result.response.text();

  const [aiMessage] = await query(
    'INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3) RETURNING id, role, content, created_at',
    [conversationId, 'assistant', aiText]
  );

  const countResult = await query(
    'SELECT COUNT(*) as count FROM messages WHERE conversation_id = $1',
    [conversationId]
  );
  if (Number(countResult[0].count) <= 2) {
    const title = message.slice(0, 50);
    await query('UPDATE conversations SET title = $1, updated_at = now() WHERE id = $2', [
      title,
      conversationId,
    ]);
  }

  return NextResponse.json({ message: aiMessage });
}
