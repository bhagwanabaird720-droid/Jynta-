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

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { prompt, type } = await req.json();
  if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  const resultText = result.response.text();

  const [content] = await query(
    'INSERT INTO generated_content (user_id, type, prompt, result_text) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, type || 'text', prompt, resultText]
  );

  return NextResponse.json({ content });
}
