interface CareerStatsData {
  total_games: number;
  total_goals: number;
  total_assists: number;
  total_saves: number;
  total_shots: number;
  total_score: number;
  avg_goals_per_game: number;
  avg_saves_per_game: number;
  avg_score_per_game: number;
}

export default function CareerStats({ stats }: { stats: CareerStatsData | null }) {
  if (!stats || stats.total_games === 0) {
    return (
      <div className="text-center text-gray-500 py-12 bg-gray-800 rounded-xl border border-gray-700 w-full max-w-6xl mx-auto mt-8">
        <h3 className="text-xl font-bold text-white mb-2">No Stats Available</h3>
        <p>Upload a replay to start generating your career statistics.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-4">
        <h2 className="text-3xl font-bold text-white">Career Statistics</h2>
        <p className="text-gray-400 mt-1">
          Aggregated across <span className="text-indigo-400 font-bold">{stats.total_games}</span> recorded matches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ================= AVERAGES (HIGHLIGHTED) ================= */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
          {/* Avg Score */}
          <div className="bg-gradient-to-br from-indigo-900/40 to-gray-800 rounded-xl border border-indigo-500/30 p-6 shadow-lg flex flex-col justify-center items-center text-center">
            <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2">Avg Score</span>
            <span className="text-5xl font-black text-white">{stats.avg_score_per_game.toFixed(1)}</span>
          </div>

          {/* Avg Goals */}
          <div className="bg-gradient-to-br from-blue-900/40 to-gray-800 rounded-xl border border-blue-500/30 p-6 shadow-lg flex flex-col justify-center items-center text-center">
            <span className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2">Avg Goals</span>
            <span className="text-5xl font-black text-white">{stats.avg_goals_per_game.toFixed(2)}</span>
          </div>

          {/* Avg Saves */}
          <div className="bg-gradient-to-br from-orange-900/40 to-gray-800 rounded-xl border border-orange-500/30 p-6 shadow-lg flex flex-col justify-center items-center text-center">
            <span className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-2">Avg Saves</span>
            <span className="text-5xl font-black text-white">{stats.avg_saves_per_game.toFixed(2)}</span>
          </div>
        </div>

        {/* ================= LIFETIME TOTALS ================= */}
        <div className="md:col-span-3 bg-gray-800 rounded-xl border border-gray-700 shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-300 mb-6 border-b border-gray-700 pb-2">Lifetime Totals</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Goals</span>
              <span className="text-2xl font-bold text-gray-100">{stats.total_goals}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Assists</span>
              <span className="text-2xl font-bold text-gray-100">{stats.total_assists}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Saves</span>
              <span className="text-2xl font-bold text-gray-100">{stats.total_saves}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Shots</span>
              <span className="text-2xl font-bold text-gray-100">{stats.total_shots}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Score</span>
              <span className="text-2xl font-bold text-gray-100">{stats.total_score}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}