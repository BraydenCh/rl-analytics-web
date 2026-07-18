import { cookies } from 'next/headers';
import Link from 'next/link';

// Helper function to fetch matches from your Python API
async function getMatches() {
  try {
    // Replace with your actual deployed API URL in production (e.g., process.env.NEXT_PUBLIC_API_URL)
    const res = await fetch('http://127.0.0.1:8000/matches/?limit=50', { 
      next: { revalidate: 30 } // Caches the fetch for 30 seconds so your DB isn't spammed
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.matches || [];
  } catch (error) {
    console.error("Failed to fetch matches:", error);
    return [];
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // 1. Authentication
  const cookieStore = cookies();
  const session = (await cookieStore).get('epic_session');

  // 2. Fetch Data & Handle Pagination
  const matches = await getMatches();
  
  // Await searchParams in Next.js 15+ (if you are on Next 14, you can remove the await)
  const resolvedParams = await searchParams;
  const currentPage = parseInt(resolvedParams?.page || '1', 10);
  const itemsPerPage = 6; // Shows 6 matches per page (2 rows of 3)
  
  const totalPages = Math.ceil(matches.length / itemsPerPage);
  const paginatedMatches = matches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-white font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <div className="text-center max-w-3xl mx-auto space-y-6 mt-12 mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 pb-2">
          Rocket League Telemetry Hub
        </h1>
        <p className="text-xl text-gray-400">
          Advanced Match Processing, Roster Analytics, and Performance Tracking.
        </p>
        <div className="pt-6 flex justify-center">
          {session ? (
            <Link 
              href="/profile" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg flex items-center gap-2"
            >
              Enter Dashboard
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Go to Login Portal
            </Link>
          )}
        </div>
      </div>

      {/* ================= MATCH FEED SECTION ================= */}
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8 border-b border-gray-700 pb-4">
          <h2 className="text-3xl font-bold">Recent Uploads</h2>
          <span className="text-gray-400">Showing {paginatedMatches.length} matches</span>
        </div>

        {matches.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-gray-800 rounded-xl border border-gray-700">
            No matches uploaded yet. Be the first to upload a replay!
          </div>
        ) : (
          <>
            {/* Match Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedMatches.map((match: any) => {
                // Separate players by team
                const blueTeam = match.player_match_stats?.filter((p: any) => p.team === 0) || [];
                const orangeTeam = match.player_match_stats?.filter((p: any) => p.team === 1) || [];

                return (
                    <Link 
                      href={`/match/${match.id}`} 
                      key={match.id} 
                      className="bg-gray-800 rounded-xl border border-gray-700 shadow-md hover:border-indigo-500 transition-colors flex flex-col cursor-pointer block"
                    >                    
                    {/* Card Header */}
                    <div className="p-4 border-b border-gray-700 bg-gray-800/50 rounded-t-xl">
                      <h3 className="font-bold text-lg truncate" title={match.name}>
                        {match.name || 'Unnamed Replay'}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(match.created_at).toLocaleString()}
                      </p>
                    </div>

                    {/* Scoreboard */}
                    <div className="p-6 flex justify-between items-center bg-gray-900/30">
                      <div className="text-4xl font-black text-blue-400">{match.team_0_score}</div>
                      <div className="text-sm font-bold text-gray-600 tracking-widest">VS</div>
                      <div className="text-4xl font-black text-orange-400">{match.team_1_score}</div>
                    </div>

                    {/* Rosters */}
                    <div className="p-4 flex-grow grid grid-cols-2 gap-4 text-sm border-t border-gray-700">
                      {/* Blue Team */}
                      <div>
                        {blueTeam.map((p: any, index: number) => (
                          <div key={p.player_id || `blue-bot-${p.username}-${index}`} className="truncate text-gray-300 mb-1">
                            <span className="text-blue-500 mr-1">•</span>
                            {p.username}
                          </div>
                        ))}
                      </div>
                      
                      {/* Orange Team */}
                      <div className="text-right">
                        {orangeTeam.map((p: any, index: number) => (
                          <div key={p.player_id || `orange-bot-${p.username}-${index}`} className="truncate text-gray-300 mb-1">
                            {p.username}
                            <span className="text-orange-500 ml-1">•</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    </Link>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-4">
                {currentPage > 1 ? (
                  <Link 
                    href={`/?page=${currentPage - 1}`}
                    className="px-6 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors"
                  >
                    &larr; Previous
                  </Link>
                ) : (
                  <button disabled className="px-6 py-2 bg-gray-900 text-gray-600 border border-gray-800 rounded-lg cursor-not-allowed">
                    &larr; Previous
                  </button>
                )}

                <div className="flex items-center px-4 text-gray-400">
                  Page {currentPage} of {totalPages}
                </div>

                {currentPage < totalPages ? (
                  <Link 
                    href={`/?page=${currentPage + 1}`}
                    className="px-6 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors"
                  >
                    Next &rarr;
                  </Link>
                ) : (
                  <button disabled className="px-6 py-2 bg-gray-900 text-gray-600 border border-gray-800 rounded-lg cursor-not-allowed">
                    Next &rarr;
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}