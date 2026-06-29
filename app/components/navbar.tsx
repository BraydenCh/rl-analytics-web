import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Navbar() {
  // Check auth state directly on the server
  const cookieStore = await cookies();
  const session = cookieStore.get('epic_session');

  // --- SERVER ACTION ---
  // This runs securely on the Next.js server when the form is submitted
  async function logoutAction() {
    "use server"; 
    
    // 1. (Optional) Tell FastAPI the user is logging out
    if (session) {
      try {
        await fetch("http://localhost:8000/auth/logout", {
          method: "POST",
          // Send the cookie manually since this is a server-to-server request
          headers: {
            Cookie: `epic_session=${session.value}` 
          }
        });
      } catch (error) {
        console.error("FastAPI logout ping failed, continuing local logout...");
      }
    }

    // 2. Delete the cookie using Next.js (bypasses all CORS/SameSite browser issues)
    const cookieStoreToUpdate = await cookies();
    cookieStoreToUpdate.delete('epic_session');

    // 3. Redirect the user back to the homepage
    redirect('/');
  }

  return (
    <header className="bg-gray-900 border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Logo & Main Navigation */}
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl tracking-tight text-white hover:text-blue-400 transition-colors">
              RL Telemetry
            </Link>
            
            {/* Show Dashboard & Upload links only if logged in */}
            {session && (
              <>
                <Link href="/profile" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link href="/upload_replay" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Upload Replay
                </Link>
              </>
            )}
          </div>

          {/* Right Side: Auth Context */}
          <div className="flex items-center gap-4">
            {session ? (
              // IF LOGGED IN: Show Profile/Logout options
              <div className="flex items-center gap-4">
                <span className="text-sm text-green-400 font-medium px-3 py-1 bg-green-400/10 rounded-full border border-green-400/20">
                  Authenticated
                </span>
                
                {/* Point the form action to our Server Action function */}
                <form action={logoutAction}>
                  <button type="submit" className="text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Sign Out
                  </button>
                </form>
                
              </div>
            ) : (
              // IF LOGGED OUT: Show the direct Epic Login button
              <a
                href="/api/auth/epic" 
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded transition-colors shadow-md"
              >
                Log in with Epic
              </a>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}