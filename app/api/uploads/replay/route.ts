import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get('epic_session')?.value;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload_replay/`, {
    method: "POST",
    headers: {
        "X-Epic-Session": session,
    },
    body: formData,
    })
  

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
