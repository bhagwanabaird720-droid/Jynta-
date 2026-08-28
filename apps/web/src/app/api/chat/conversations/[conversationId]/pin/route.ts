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
  const { pinned } = await req.json();
  await query('UPDATE conversations SET is_pinned = $1 WHERE id = $2 AND user_id = $3', [
    pinned,
    conversationId,
    userId,
  ]);
  return NextResponse.json({ success: true });
}
