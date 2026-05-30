import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Home() {
  // 1. Check if the user is already authenticated
  const cookieStore = cookies();
  const session = (await cookieStore).get('epic_session');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        
        {/* Added a subtle gradient to the text to make the landing page pop */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 pb-2">
          Rocket League Telemetry Hub
        </h1>
        
        <p className="text-xl text-gray-400">
          Advanced Match Processing, Roster Analytics, and Performance Tracking.
        </p>

        <div className="pt-8 flex justify-center">
          {session ? (
            /* If they are logged in, send them straight to the app */
            <Link 
              href="/profile" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg flex items-center gap-2"
            >
              Enter Dashboard
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            /* If they are logged out, point them to the front door */
            <Link 
              href="/login" 
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Go to Login Portal
            </Link>
          )}
        </div>
        
      </div>
    </main>
  );
}