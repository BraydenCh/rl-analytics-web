// app/match/[id]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MatchTable from './MatchTable'; // Import the new client component

// Fetch the single match from your FastAPI backend
async function getMatchDetails(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/matches/${id}`, {
      cache: 'no-store', // Always fetch fresh data for detailed views
    });
    
    if (!res.ok) return null;
    
    const data = await res.json();
    return data.match;
  } catch (error) {
    console.error("Failed to fetch match:", error);
    return null;
  }
}

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await params in Next.js 15
  const resolvedParams = await params;
  const match = await getMatchDetails(resolvedParams.id);

  // 2. If the backend returns 404, trigger the Next.js not-found page
  if (!match) {
    notFound();
  }

  // 3. Separate the teams
  const blueTeam = match.player_match_stats?.filter((p: any) => p.team === 0) || [];
  const orangeTeam = match.player_match_stats?.filter((p: any) => p.team === 1) || [];

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-white font-sans">
      <div className="w-full max-w-5xl mt-8">
        
        {/* Back Button & Header */}
        <div className="mb-8">
          <Link href="/" className="text-indigo-400 hover:text-indigo-300 font-medium text-sm flex items-center gap-1 mb-4">
            &larr; Back to Match Feed
          </Link>
          <div className="flex justify-between items-end border-b border-gray-700 pb-4">
            <div>
              <h1 className="text-4xl font-extrabold text-white">{match.name || 'Unnamed Replay'}</h1>
              <p className="text-gray-400 mt-2">{new Date(match.created_at).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Final Score</span>
              <div className="text-3xl font-black mt-1">
                <span className="text-blue-500">{match.team_0_score}</span>
                <span className="text-gray-600 mx-2">-</span>
                <span className="text-orange-500">{match.team_1_score}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats Tables handled by Client Component */}
        <MatchTable blueTeam={blueTeam} orangeTeam={orangeTeam} />

      </div>
    </main>
  );
}