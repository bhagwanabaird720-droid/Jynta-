import { NextRequest, NextResponse } from 'next/server';
import { query } from '@jynta/database';
import { verifyToken } from '@/lib/auth/authClient';

async function getUserId(req: NextRequest) {
  const token = req.cookies.get('jynta_session')?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  return payload?.userId || null;
}

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { conversationId, title } = await req.json();
  if (!conversationId || !title) {
    return NextResponse.json({ error: 'conversationId and title required' }, { status: 400 });
  }
  const [item] = await query(
    'INSERT INTO memory_items (user_id, category, title, content) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, 'chats', title, `/assistant/chat/${conversationId}`]
  );
  return NextResponse.json({ item });
}
