import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  const state = crypto.randomBytes(16).toString('hex');
  
  // Construct the URL completely on the server-side
  const epicUrl = new URL("https://www.epicgames.com/id/authorize");
  epicUrl.searchParams.append("client_id", process.env.EPIC_CLIENT_ID!);
  epicUrl.searchParams.append("response_type", "code");
  epicUrl.searchParams.append("redirect_uri", process.env.EPIC_REDIRECT_URI!);
  epicUrl.searchParams.append("scope", process.env.EPIC_SCOPES!);
  epicUrl.searchParams.append("state", state);

  const response = NextResponse.redirect(epicUrl.toString());
  
  // Stash the state string securely in an HTTP-only cookie
  response.cookies.set("epic_auth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 300, // 5 minutes
  });

  return response;
}