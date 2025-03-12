"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Meme {
  id: string;
  url: string;
  name: string;
  likes: number;
}

export default function LeaderboardPage() {
  const [topMemes, setTopMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes") || "{}");

    async function fetchMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      const memes = data.data.memes;

      // Attach likes count to each meme
      const likedMemes = memes.map((meme: Meme) => ({
        ...meme,
        likes: storedLikes[meme.id] ? 1 : 0 || 0,
      }));

      // Sort memes by likes and take the top 10
      const sortedMemes = likedMemes
        .sort((a: Meme, b: Meme) => b.likes - a.likes)
        .slice(0, 10);

      setTopMemes(sortedMemes);
    }

    fetchMemes();
  }, []);

  return (
    <main className="p-6 py-30">
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        🏆 Meme Leaderboard
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
        {topMemes.map((meme, index) => (
          <motion.div
            key={meme.id}
            className="border rounded-lg shadow-lg p-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-lg font-semibold">
              #{index + 1} {meme.name}
            </p>
            <Image
              src={meme.url}
              alt={meme.name}
              width={300}
              height={300}
              className="rounded-lg mt-2"
            />
            <p className="text-center text-gray-600 mt-2">
              {meme.likes} Like(s)
            </p>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
