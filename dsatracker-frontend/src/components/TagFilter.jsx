import { useEffect, useState } from 'react';
import { getStats, getByTag } from '../services/api';

function TagFilter({ onFilter }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getStats().then((res) => {
      const tagNames = Object.keys(res.data.tags);
      setTags(tagNames);
    });
  }, []);

  return (
    <div className="mb-4 flex items-center space-x-3">
      <label className="font-medium text-gray-200">Filter by tag:</label>
      <select
        onChange={(e) => {
          const tag = e.target.value;
          if (tag === '') {
            onFilter(null);
          } else {
            getByTag(tag).then((res) => onFilter(res.data));
          }
        }}
        className="bg-white/10 text-white px-3 py-1 rounded-lg border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      >
        <option value="">All</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TagFilter;
