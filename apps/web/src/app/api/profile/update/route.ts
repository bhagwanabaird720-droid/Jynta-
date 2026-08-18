import { NextRequest, NextResponse } from 'next/server';
import { query } from '@jynta/database';
import { verifyToken } from '@/lib/auth/authClient';

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get('jynta_session')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { fullName } = await req.json();
  if (!fullName) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

  const [user] = await query(
    'UPDATE users SET full_name = $1, updated_at = now() WHERE id = $2 RETURNING id, full_name, email',
    [fullName, payload.userId]
  );

  return NextResponse.json({ user });
}
