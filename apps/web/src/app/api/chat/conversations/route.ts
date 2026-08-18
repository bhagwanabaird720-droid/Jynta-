import { NextRequest, NextResponse } from 'next/server';
import { query } from '@jynta/database';
import { verifyToken } from '@/lib/auth/authClient';

async function getUserId(req: NextRequest) {
  const token = req.cookies.get('jynta_session')?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  return payload?.userId || null;
}

export async function GET(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const conversations = await query(
    'SELECT id, title, created_at FROM conversations WHERE user_id = $1 ORDER BY updated_at DESC',
    [userId]
  );

  return NextResponse.json({ conversations });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [conversation] = await query(
    'INSERT INTO conversations (user_id, title) VALUES ($1, $2) RETURNING id, title, created_at',
    [userId, 'New Chat']
  );

  return NextResponse.json({ conversation });
}
