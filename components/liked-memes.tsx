"use client";

import initializeAOS from "@/utils/aos-init";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";

interface Meme {
  id: string;
  name: string;
  url: string;
}

export default function LikedMemes() {
  const [likedMemes, setLikedMemes] = useState<Meme[]>([]);

  // Memoize liked meme IDs from localStorage
  const likedMemeIds = useMemo(() => {
    if (typeof window === "undefined") return new Set();
    const storedLikes: Record<string, boolean> = JSON.parse(localStorage.getItem("likes") || "{}");
    return new Set(Object.keys(storedLikes).filter((id) => storedLikes[id]));
  }, []);

  const fetchMemes = useCallback(async () => {
    try {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();

      if (data.success) {
        const filteredMemes = data.data.memes.filter((m: Meme) => likedMemeIds.has(m.id));
        setLikedMemes(filteredMemes);
      }
    } catch (error) {
      console.error("Failed to fetch memes:", error);
    }
  }, [likedMemeIds]);

  useEffect(() => {
    fetchMemes();
  }, [fetchMemes]);

  useEffect(() => {
    const timeout = setTimeout(() => initializeAOS(), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mt-4" data-aos="fade-up">
      {likedMemes.length === 0 ? (
        <p>No liked memes yet.</p>
      ) : (
        likedMemes.map((meme) => (
          <Image
            key={meme.id}
            src={meme.url}
            alt={meme.name}
            width={200}
            height={200}
            className="rounded-lg shadow-md"
            priority
          />
        ))
      )}
    </div>
  );
}
