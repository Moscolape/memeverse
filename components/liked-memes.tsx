"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Meme {
  id: string;
  name: string;
  url: string;
}

export default function LikedMemes() {
  const [likedMemes, setLikedMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const storedLikes: Record<string, boolean> = JSON.parse(localStorage.getItem("likes") || "{}");

    async function fetchMemes() {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();

        if (data.success) {
          const filteredMemes = data.data.memes.filter((m: Meme) => storedLikes[m.id]);
          setLikedMemes(filteredMemes);
        }
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    }

    fetchMemes();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {likedMemes.length === 0 ? (
        <p>No liked memes yet.</p>
      ) : (
        likedMemes.map((meme) => (
          <Image
            key={meme.id}
            src={meme.url}
            alt={meme.name}
            width={200} // Adjust as needed
            height={200} // Adjust as needed
            className="rounded-lg shadow-md"
          />
        ))
      )}
    </div>
  );
}
