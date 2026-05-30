import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Login() {
  // 1. The Bouncer: Check if they already have an active session
  const cookieStore = cookies();
  const session = (await cookieStore).get('epic_session');

  // 2. If logged in, instantly route them to the hub
  if (session) {
    redirect('/profile');
  }

  // 3. If logged out, render the primary Epic login gateway
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <div className="text-center max-w-2xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Rocket League Telemetry Hub
          </h1>
          <p className="text-xl text-gray-400">
            The central portal for managing the collegiate esports roster, syncing platform accounts, and tracking performance.
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6">Player Portal Access</h2>
          
          <a 
            href="/api/auth/epic" 
            className="inline-flex w-full justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            Log in with Epic Games
          </a>
          
          <p className="mt-6 text-sm text-gray-500">
            Authentication requires a verified Epic Games account. You will link your Steam account inside the dashboard.
          </p>
        </div>
        
      </div>
    </main>
  );
}