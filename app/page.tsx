"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Meme } from "./meme-explorer/meme-explorer";

async function getMemes() {
  const res = await fetch("https://api.imgflip.com/get_memes");
  const data = await res.json();
  return data.data.memes;
}

export default function HomePage() {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    async function fetchMemes() {
      const fetchedMemes = await getMemes();

      // Randomly select 15 memes
      const shuffledMemes = fetchedMemes
        .sort(() => Math.random() - 0.5)
        .slice(0, 16);

      setMemes(shuffledMemes);
    }

    fetchMemes();
  }, []);

  return (
    <main className="p-10 mt-15 relative">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold text-center mb-6"
      >
        Memeverse
      </motion.h1>

      {/* Meme Grid */}
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
        {memes.map((meme) => (
          <Link key={meme.id} href={`/meme/${meme.id}`} passHref>
            <motion.div
              className="border p-2 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={meme.url}
                alt={meme.name}
                width={meme.width} // Use original width
                height={meme.height} // Use original height
                className="rounded-lg"
                layout="intrinsic"
              />
              <p className="text-center mt-2">{meme.name}</p>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </main>
  );
}