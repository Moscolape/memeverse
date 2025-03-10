import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(search);
    }, 500); // Debounce API calls

    return () => clearTimeout(delayDebounceFn);
  }, [search, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search memes..."
      className="border p-2 rounded w-full"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
