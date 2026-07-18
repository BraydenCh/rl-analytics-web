import Link from 'next/link';
import { notFound } from 'next/navigation';

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

        {/* Detailed Stats Tables */}
        <div className="space-y-8">
          
          {/* Blue Team Table */}
          <div className="bg-gray-800 border border-blue-900/50 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-blue-900/30 px-6 py-3 border-b border-blue-900/50">
              <h2 className="text-xl font-bold text-blue-400">Blue Team</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900/50 text-gray-400 text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Player</th>
                    <th className="px-6 py-4 font-semibold text-center">Score</th>
                    <th className="px-6 py-4 font-semibold text-center">Goals</th>
                    <th className="px-6 py-4 font-semibold text-center">Assists</th>
                    <th className="px-6 py-4 font-semibold text-center">Saves</th>
                    <th className="px-6 py-4 font-semibold text-center">Shots</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {blueTeam.map((p: any, index: number) => (
                    <tr key={p.player_id || `blue-bot-${p.username}-${index}`} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                        {p.username}
                        {p.platform && <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">{p.platform}</span>}
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-gray-200">{p.score}</td>
                      <td className="px-6 py-4 text-center text-gray-300">{p.goals}</td>
                      <td className="px-6 py-4 text-center text-gray-300">{p.assists}</td>
                      <td className="px-6 py-4 text-center text-gray-300">{p.saves}</td>
                      <td className="px-6 py-4 text-center text-gray-300">{p.shots}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Orange Team Table */}
          <div className="bg-gray-800 border border-orange-900/50 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-orange-900/30 px-6 py-3 border-b border-orange-900/50">
              <h2 className="text-xl font-bold text-orange-400">Orange Team</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900/50 text-gray-400 text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Player</th>
                    <th className="px-6 py-4 font-semibold text-center">Score</th>
                    <th className="px-6 py-4 font-semibold text-center">Goals</th>
                    <th className="px-6 py-4 font-semibold text-center">Assists</th>
                    <th className="px-6 py-4 font-semibold text-center">Saves</th>
                    <th className="px-6 py-4 font-semibold text-center">Shots</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {orangeTeam.map((p: any, index: number) => (
                    <tr key={p.player_id || `orange-bot-${p.username}-${index}`} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                        {p.username}
                        {p.platform && <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">{p.platform}</span>}
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-gray-200">{p.score}</td>
                      <td className="px-6 py-4 text-center text-gray-300">{p.goals}</td>
                      <td className="px-6 py-4 text-center text-gray-300">{p.assists}</td>
                      <td className="px-6 py-4 text-center text-gray-300">{p.saves}</td>
                      <td className="px-6 py-4 text-center text-gray-300">{p.shots}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}