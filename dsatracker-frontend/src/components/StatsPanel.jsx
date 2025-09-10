import { useEffect, useState } from "react";
import { getStats } from "../services/api";

function StatsPanel() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then((res) => setStats(res.data));
  }, []);

  if (!stats)
    return (
      <div className="text-gray-400 italic animate-pulse">Loading stats...</div>
    );

  return (
    <div className="bg-white/5 backdrop-blur-md shadow-2xl rounded-2xl p-6 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6 drop-shadow">
        📊 Stats Overview
      </h2>

      {/* Main numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-600/80 to-cyan-500/80 p-4 rounded-xl shadow-lg">
          <span className="text-3xl font-extrabold">{stats.total}</span>
          <span className="text-sm text-gray-200">Total Problems</span>
        </div>

        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-600/80 to-emerald-500/80 p-4 rounded-xl shadow-lg">
          <span className="text-3xl font-extrabold">{stats.solved}</span>
          <span className="text-sm text-gray-200">Solved ✅</span>
        </div>

        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-600/80 to-pink-500/80 p-4 rounded-xl shadow-lg">
          <span className="text-3xl font-extrabold">{stats.unsolved}</span>
          <span className="text-sm text-gray-200">Unsolved ❌</span>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(stats.tags).map(([tag, count]) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/20 text-gray-200 shadow-sm hover:bg-white/20 transition"
            >
              {tag} <span className="font-semibold">({count})</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
