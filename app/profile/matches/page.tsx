import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// Pass the session token securely to FastAPI
async function getMyMatches(sessionToken: string) {
  try {
    const res = await fetch('http://127.0.0.1:8000/my_matches', {
      headers: {
        Cookie: `epic_session=${sessionToken}`
      },
      cache: 'no-store' // Always fetch fresh for personal data
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.matches || [];
  } catch (error) {
    console.error("Failed to fetch personal matches:", error);
    return [];
  }
}

export default async function MyMatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // 1. Verify Authentication
  const cookieStore = await cookies();
  const session = cookieStore.get('epic_session')?.value;

  if (!session) {
    redirect('/login'); // Kick them out if they aren't logged in
  }

  // 2. Fetch Data & Handle Pagination
  const matches = await getMyMatches(session);
  const resolvedParams = await searchParams;
  
  const currentPage = parseInt(resolvedParams?.page || '1', 10);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(matches.length / itemsPerPage);
  
  const paginatedMatches = matches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-white font-sans">
      <div className="w-full max-w-6xl mt-8">
        
        {/* Header */}
        <div className="mb-8 border-b border-gray-700 pb-4 flex justify-between items-end">
          <div>
            <Link href="/profile" className="text-indigo-400 hover:text-indigo-300 font-medium text-sm flex items-center gap-1 mb-4">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-4xl font-extrabold text-white">My Replays</h1>
            <p className="text-gray-400 mt-2">Every match tied to your connected accounts.</p>
          </div>
          <span className="text-gray-400 text-sm font-bold bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            Total Matches: {matches.length}
          </span>
        </div>

        {/* Match Feed */}
        {matches.length === 0 ? (
          <div className="text-center text-gray-500 py-16 bg-gray-800 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
            <p>Upload a replay featuring your Epic or connected platform accounts to see them here.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedMatches.map((match: any) => {
                const blueTeam = match.player_match_stats?.filter((p: any) => p.team === 0) || [];
                const orangeTeam = match.player_match_stats?.filter((p: any) => p.team === 1) || [];

                return (
                  <Link 
                    href={`/match/${match.id}`} 
                    key={match.id} 
                    className="bg-gray-800 rounded-xl border border-gray-700 shadow-md hover:border-indigo-500 transition-colors flex flex-col cursor-pointer block group"
                  >
                    <div className="p-4 border-b border-gray-700 bg-gray-800/50 rounded-t-xl group-hover:bg-indigo-900/20 transition-colors">
                      <h3 className="font-bold text-lg truncate text-white" title={match.name}>
                        {match.name || 'Unnamed Replay'}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(match.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="p-6 flex justify-between items-center bg-gray-900/30">
                      <div className="text-4xl font-black text-blue-400">{match.team_0_score}</div>
                      <div className="text-sm font-bold text-gray-600 tracking-widest">VS</div>
                      <div className="text-4xl font-black text-orange-400">{match.team_1_score}</div>
                    </div>

                    <div className="p-4 flex-grow grid grid-cols-2 gap-4 text-sm border-t border-gray-700">
                      <div>
                        {blueTeam.map((p: any, index: number) => (
                          <div key={p.player_id || `blue-bot-${p.username}-${index}`} className="truncate text-gray-300 mb-1">
                            <span className="text-blue-500 mr-1">•</span>
                            {p.username}
                          </div>
                        ))}
                      </div>
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
                    href={`/profile/matches?page=${currentPage - 1}`}
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
                    href={`/profile/matches?page=${currentPage + 1}`}
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