import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { query } from '@jynta/database';
import { verifyToken } from '@/lib/auth/authClient';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function getUserId(req: NextRequest) {
  const token = req.cookies.get('jynta_session')?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  return payload?.userId || null;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ conversationId: string }> }
) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { conversationId } = await params;
  const { message } = await req.json();

  if (!message) return NextResponse.json({ error: 'Message is required' }, { status: 400 });

  // Save user message
  await query(
    'INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3)',
    [conversationId, 'user', message]
  );

  // Get conversation history
  const history = await query(
    'SELECT role, content FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC',
    [conversationId]
  );

  // Call Claude
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    messages: history.map((m) => ({ role: m.role, content: m.content })),
  });

  const aiText = response.content
    .map((block) => (block.type === 'text' ? block.text : ''))
    .join('');

  // Save AI message
  const [aiMessage] = await query(
    'INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3) RETURNING id, role, content, created_at',
    [conversationId, 'assistant', aiText]
  );

  // Update conversation title if it's the first message
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
