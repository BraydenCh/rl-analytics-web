import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  const cookieStore = await cookies();
  const session = cookieStore.get('epic_session')?.value;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { platform } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${platform}/unlink`, {
    method: 'POST',
    headers: { Cookie: `epic_session=${session}` },
  });

  return NextResponse.json({}, { status: res.status });
}
