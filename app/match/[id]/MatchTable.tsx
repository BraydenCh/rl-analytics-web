// app/match/[id]/MatchTable.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function MatchTable({ 
  blueTeam, 
  orangeTeam 
}: { 
  blueTeam: any[], 
  orangeTeam: any[] 
}) {
  const router = useRouter();

  return (
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
                <tr 
                  key={p.player_id || `blue-bot-${p.username}-${index}`} 
                  className={`transition-colors ${p.player_id ? 'hover:bg-gray-700/30 cursor-pointer' : ''}`}
                  onClick={() => {
                    if (p.player_id) {
                      router.push(`/profile/${p.player_id}/matches`);
                    }
                  }}
                >
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    {p.username}
                    {p.platform && (
                      <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">
                        {p.platform}
                      </span>
                    )}
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
                <tr 
                  key={p.player_id || `orange-bot-${p.username}-${index}`} 
                  className={`transition-colors ${p.player_id ? 'hover:bg-gray-700/30 cursor-pointer' : ''}`}
                  onClick={() => {
                    if (p.player_id) {
                      router.push(`/profile/${p.player_id}/matches`);
                    }
                  }}
                >
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    {p.username}
                    {p.platform && (
                      <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">{p.platform}</span>
                    )}
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
  );
}