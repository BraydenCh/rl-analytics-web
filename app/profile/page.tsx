import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  // 1. The Bouncer: Check for the session cookie
  const cookieStore = cookies();
  const session = (await cookieStore).get('epic_session');

  if (!session) {
    // If they don't have the cookie, kick them back to the front door immediately
    redirect('/');
  }

  // 2. Fetch the player's data from your FastAPI backend
  // (You'll need a quick FastAPI endpoint that reads the cookie and returns the DB row)
  const res = await fetch('http://localhost:8000/api/users/me', {
    headers: {
      Cookie: `epic_session=${session.value}`,
    },
  });

  if (!res.ok) {
    // If the backend says the session is invalid or expired, force a re-login
    redirect('/');
  }

  const user = await res.json();

  // 3. Render the UI
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-bold">Player Profile</h1>
          <p className="text-gray-400">Manage your connected accounts and roster details.</p>
        </div>

        {/* Primary Identity Section */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Primary Account (Epic Games)</h2>
          <div className="space-y-2">
            <p><span className="text-gray-400">Display Name:</span> <span className="font-medium text-lg">{user.epic_name}</span></p>
            <p><span className="text-gray-400">Epic ID:</span> <span className="font-mono text-sm text-gray-500">{user.epic_id}</span></p>
          </div>
        </div>

        {/* Identity Linking Section */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Platform Connections</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Link your external accounts to sync your Rocket League stats.
          </p>

          {user.steam_id ? (
            <div className="flex justify-between items-center bg-gray-900 p-4 rounded border border-green-900/50">
              <span className="font-medium">Steam Account</span>
              <span className="font-mono text-sm text-green-400">{user.steam_id}</span>
            </div>
          ) : (
            <a
              href="http://localhost:8000/auth/login/steam"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 py-3 rounded-md font-semibold transition-colors"
            >
              Link Steam Account
            </a>
          )}
        </div>

      </div>
    </div>
  );
}