import './App.css';
import AddProblem from './components/AddProblem';
import ProblemList from './components/ProblemList';
import StatsPanel from './components/StatsPanel';
import TagFilter from './components/TagFilter';
import LoginPage from './components/LoginPage';
import Hero from './components/Hero';
import { useEffect, useState } from 'react';
import { getAllProblems, deleteProblem } from './services/api';

function App() {
  const [problems, setProblems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [statsKey, setStatsKey] = useState(0); // Add this line

  const loadProblems = async () => {
    const res = await getAllProblems();
    setProblems(res.data);
  };

  // New: Reload both problems and stats
  const loadProblemsAndStats = async () => {
    await loadProblems();
    setStatsKey((prev) => prev + 1); // Force StatsPanel to re-mount and reload
  };

  const handleDelete = async (id) => {
    await deleteProblem(id);
    loadProblemsAndStats();
  };

  const handleFilter = (filtered) => {
    if (filtered) {
      setProblems(filtered);
    } else {
      loadProblems();
    }
  };

  useEffect(() => {
    if (loggedIn) loadProblems();
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-dark text-white px-4 py-6 space-y-10">
        <Hero />
        <LoginPage onLogin={() => setLoggedIn(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white transition-all duration-1000 ease-in-out px-4 py-6">
      <header className="bg-black/60 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight drop-shadow-md">
            🚀 DSA Practice Tracker
          </h1>
          <span className="text-gray-400 text-sm sm:text-base font-medium hidden sm:inline">
            Built with ❤️ Java + React
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Stats Panel */}
        <div className="animate-fadeIn">
          <StatsPanel key={statsKey} />
        </div>

        {/* Add Problem */}
        <section className="bg-white/5 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/10 transition-transform duration-300 hover:scale-[1.01]">
          <AddProblem onAdd={loadProblemsAndStats} />
        </section>

        {/* Tag Filter */}
        <section className="bg-white/5 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/10 transition-transform duration-300 hover:scale-[1.01]">
          <TagFilter onFilter={handleFilter} />
        </section>

        {/* Problem List */}
        <section className="bg-white/5 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/10 transition-transform duration-300 hover:scale-[1.01]">
          <ProblemList problems={problems} onDelete={handleDelete} />
        </section>
      </main>

      <footer className="text-center text-sm sm:text-base text-gray-400 mt-10 pb-6">
        © {new Date().getFullYear()} DSA Tracker • Built for You 💻
      </footer>
    </div>
  );
}

export default App;
