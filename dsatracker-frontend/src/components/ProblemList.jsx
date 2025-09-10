function ProblemList({ problems, onDelete }) {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight">
        🚀 All Problems
      </h2>

      <div className="overflow-x-auto rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
        <table className="min-w-full text-sm sm:text-base text-white">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
              <th className="py-4 px-6 text-left font-semibold">Title</th>
              <th className="py-4 px-6 text-left font-semibold">Tag</th>
              <th className="py-4 px-6 text-left font-semibold">Difficulty</th>
              <th className="py-4 px-6 text-left font-semibold">Status</th>
              <th className="py-4 px-6 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((p, idx) => (
              <tr
                key={p.id}
                className={`transition duration-200 ${
                  idx % 2 === 0 ? "bg-white/5" : "bg-white/0"
                } hover:bg-white/15`}
              >
                <td className="py-4 px-6">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 font-medium underline hover:text-cyan-100 transition"
                  >
                    {p.title}
                  </a>
                </td>

                <td className="py-4 px-6 capitalize text-gray-200">{p.tag}</td>

                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md ${
                      p.difficulty === "easy"
                        ? "bg-green-600/80 text-white"
                        : p.difficulty === "medium"
                        ? "bg-yellow-500/80 text-white"
                        : "bg-red-600/80 text-white"
                    }`}
                  >
                    {p.difficulty}
                  </span>
                </td>

                <td className="py-4 px-6 text-xl">
                  {p.solved ? "✅" : "❌"}
                </td>

                <td className="py-4 px-6">
                  <button
                    onClick={() => onDelete(p.id)}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-red-500/40 transition-transform transform hover:scale-105"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProblemList;
