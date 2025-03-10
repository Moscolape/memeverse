"use client";

import { useState, useEffect } from "react";
import MemeCard from "./meme-card";
import Pagination from "./pagination";
import Filters from "./filters";
import SearchBar from "./search";
import SortOptions from "./sort-options";

// Define the Meme type with additional fields
export interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  likes: number;        // New field
  comments: number;     // New field
  created_at: string;   // New field
}

// Function to generate random values for likes, comments, and created_at
function enhanceMemeData(memes: Meme[]): Meme[] {
  return memes.map((meme) => ({
    ...meme,
    likes: Math.floor(Math.random() * 500), // Random likes (0-500)
    comments: Math.floor(Math.random() * 100), // Random comments (0-100)
    created_at: new Date(
      Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Random past date within the last year
  }));
}

// Fetch memes and enhance them with local fields
async function getMemes(): Promise<Meme[]> {
  const res = await fetch("https://api.imgflip.com/get_memes");
  const data = await res.json();
  return enhanceMemeData(data.data.memes);
}

export default function MemeExplorer({ initialMemes }: { initialMemes: Meme[] }) {
  const [memes, setMemes] = useState<Meme[]>(initialMemes);
  const [filteredMemes, setFilteredMemes] = useState<Meme[]>(initialMemes);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("Trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("likes"); // Default sorting
  const memesPerPage = 10;

  useEffect(() => {
    async function fetchMemes() {
      const fetchedMemes = await getMemes();
      setMemes(fetchedMemes);
    }
    fetchMemes();
  }, []);

  // Filtering & Sorting logic
  useEffect(() => {
    let filtered = [...memes];

    if (searchQuery) {
      filtered = filtered.filter((meme) =>
        meme.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (category) {
      case "Trending":
        filtered = filtered.slice(0, 50);
        break;
      case "New":
        filtered = filtered.reverse();
        break;
      case "Classic":
        filtered = filtered.slice(20, 70);
        break;
      case "Random":
        filtered = [...filtered].sort(() => Math.random() - 0.5);
        break;
    }

    // Sorting logic (Now it works because these fields exist)
    if (sortBy === "likes") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "date") {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === "comments") {
      filtered.sort((a, b) => b.comments - a.comments);
    }

    setFilteredMemes(filtered);
  }, [memes, category, searchQuery, sortBy]);

  // Pagination logic
  const indexOfLastMeme = currentPage * memesPerPage;
  const indexOfFirstMeme = indexOfLastMeme - memesPerPage;
  const currentMemes = filteredMemes.slice(indexOfFirstMeme, indexOfLastMeme);
  const totalPages = Math.ceil(filteredMemes.length / memesPerPage);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center">Meme Explorer</h1>

      <div className="flex flex-col md:flex-row justify-between my-4 space-y-2 md:space-y-0">
        <SearchBar onSearch={setSearchQuery} />
        <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <Filters activeCategory={category} setCategory={setCategory} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentMemes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}
