import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const session = cookieStore.get('epic_session')?.value;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${id}`, {
    method: 'DELETE',
    headers: { Cookie: `epic_session=${session}` },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to delete match' }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
