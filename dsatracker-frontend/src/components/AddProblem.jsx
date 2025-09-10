import { useState } from "react";
import { addProblem } from "../services/api";

function AddProblem({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    url: "",
    tag: "",
    difficulty: "easy",
    solved: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("📤 Sending data:", form); // debug log
      const res = await addProblem(form);
      console.log("✅ Added successfully:", res.data);

      if (onAdd) onAdd(); // reload list
      setForm({
        title: "",
        url: "",
        tag: "",
        difficulty: "easy",
        solved: false,
      });
    } catch (err) {
      console.error("❌ Failed to add problem:", err.response || err.message);
      
      
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10"
    >
      <h2 className="text-xl font-bold text-primary flex items-center gap-2">
        ➕ Add New Problem
      </h2>

      {/* Title */}
      <input
        className="w-full rounded-lg border border-gray-600 bg-black/40 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      {/* URL */}
      <input
        className="w-full rounded-lg border border-gray-600 bg-black/40 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary"
        name="url"
        placeholder="Problem URL"
        value={form.url}
        onChange={handleChange}
        required
      />

      {/* Tags */}
      <input
        className="w-full rounded-lg border border-gray-600 bg-black/40 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary"
        name="tag"
        placeholder="Tags (e.g., array, dp)"
        value={form.tag}
        onChange={handleChange}
        required
      />

      {/* Difficulty */}
      <select
        name="difficulty"
        className="w-full rounded-lg border border-gray-600 bg-black/40 p-3 text-white focus:ring-2 focus:ring-primary"
        value={form.difficulty}
        onChange={handleChange}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      {/* Solved Checkbox */}
      <label className="flex items-center gap-2 text-sm text-gray-300">
        <input
          type="checkbox"
          name="solved"
          checked={form.solved}
          onChange={handleChange}
          className="accent-primary w-4 h-4"
        />
        Solved
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded-lg bg-primary p-3 font-semibold text-white shadow-md hover:shadow-[0_0_15px_#ff6a00] hover:bg-primary/80 transition"
      >
        Add Problem
      </button>
    </form>
  );
}

export default AddProblem;
