import { NextRequest, NextResponse } from 'next/server';
import { query } from '@jynta/database';
import { verifyToken } from '@/lib/auth/authClient';

async function getUserId(req: NextRequest) {
  const token = req.cookies.get('jynta_session')?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  return payload?.userId || null;
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ conversationId: string }> }
) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { conversationId } = await context.params;
  const { title } = await req.json();

  await query('UPDATE conversations SET title = $1, updated_at = now() WHERE id = $2 AND user_id = $3', [
    title,
    conversationId,
    userId,
  ]);

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ conversationId: string }> }
) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { conversationId } = await context.params;

  await query('DELETE FROM conversations WHERE id = $1 AND user_id = $2', [conversationId, userId]);

  return NextResponse.json({ success: true });
}
