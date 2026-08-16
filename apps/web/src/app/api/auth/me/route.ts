import { NextRequest, NextResponse } from 'next/server';
import { query } from '@jynta/database';
import { verifyToken } from '@/lib/auth/authClient';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('jynta_session')?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ user: null });
  }

  const [user] = await query(
    'SELECT id, full_name, email FROM users WHERE id = $1',
    [payload.userId]
  );

  return NextResponse.json({ user: user || null });
}
