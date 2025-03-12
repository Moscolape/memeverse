"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import MemeCard from "./meme-card";
import Pagination from "./pagination";
import Filters from "./filters";
import SearchBar from "./search";
import SortOptions from "./sort-options";
import { motion } from "framer-motion";

export interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  likes: number;
  comments: number;
  created_at: string;
}

function enhanceMemeData(memes: Meme[]): Meme[] {
  return memes.map((meme) => ({
    ...meme,
    likes: Math.floor(Math.random() * 500),
    comments: Math.floor(Math.random() * 100),
    created_at: new Date(
      Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
    ).toISOString(),
  }));
}

async function getMemes(): Promise<Meme[]> {
  const res = await fetch("https://api.imgflip.com/get_memes");
  const data = await res.json();
  return enhanceMemeData(data.data.memes);
}

export default function MemeExplorer({
  initialMemes,
}: {
  initialMemes: Meme[];
}) {
  const [memes, setMemes] = useState<Meme[]>(initialMemes);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("Trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("likes");
  const memesPerPage = 10;

  // Fetch memes only if initialMemes is empty
  useEffect(() => {
    if (initialMemes.length === 0) {
      getMemes().then(setMemes);
    }
  }, [initialMemes.length]);

  // Debounce search query updates
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filtering and sorting logic (memoized to avoid unnecessary recalculations)
  const filteredMemes = useMemo(() => {
    let filtered = [...memes];

    if (debouncedSearch) {
      filtered = filtered.filter((meme) =>
        meme.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    switch (category) {
      case "Trending":
        filtered = filtered.slice(0, 50);
        break;
      case "New":
        filtered = [...filtered].reverse();
        break;
      case "Classic":
        filtered = filtered.slice(20, 70);
        break;
      case "Random":
        filtered = [...filtered].sort(() => Math.random() - 0.5);
        break;
    }

    if (sortBy === "likes") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "date") {
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === "comments") {
      filtered.sort((a, b) => b.comments - a.comments);
    }

    return filtered;
  }, [memes, debouncedSearch, category, sortBy]);

  // Pagination (memoized)
  const currentMemes = useMemo(() => {
    const start = (currentPage - 1) * memesPerPage;
    return filteredMemes.slice(start, start + memesPerPage);
  }, [filteredMemes, currentPage]);

  const totalPages = Math.ceil(filteredMemes.length / memesPerPage);

  // Memoized callbacks to prevent unnecessary re-renders
  const handleSearch = useCallback((query: string) => setSearchQuery(query), []);
  const handleSortChange = useCallback((sort: string) => setSortBy(sort), []);
  const handleCategoryChange = useCallback((cat: string) => setCategory(cat), []);
  const handlePageChange = useCallback((page: number) => setCurrentPage(page), []);

  return (
    <main className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold text-center mb-6"
      >
        Meme Explorer
      </motion.h1>

      <div className="flex flex-col md:flex-row justify-between my-4 space-y-2 sm:space-x-2 md:space-y-0">
        <SearchBar onSearch={handleSearch} />
        <SortOptions sortBy={sortBy} setSortBy={handleSortChange} />
      </div>

      <Filters activeCategory={category} setCategory={handleCategoryChange} />

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {currentMemes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </motion.div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </main>
  );
}
