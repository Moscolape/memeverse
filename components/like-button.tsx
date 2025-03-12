"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function LikeButton({ memeId }: { memeId: string }) {
  const [liked, setLiked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const storedLikes = JSON.parse(localStorage.getItem("likes") || "{}");
    return storedLikes[memeId] || false;
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "likes") {
        const updatedLikes = JSON.parse(event.newValue || "{}");
        setLiked(updatedLikes[memeId] || false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [memeId]);

  const handleLike = useCallback(() => {
    setLiked((prev) => {
      const newLikedState = !prev;
      const updatedLikes = { ...JSON.parse(localStorage.getItem("likes") || "{}"), [memeId]: newLikedState };
      localStorage.setItem("likes", JSON.stringify(updatedLikes));
      return newLikedState;
    });
  }, [memeId]);

  return (
    <motion.button
      className="text-2xl"
      whileTap={{ scale: 0.8 }}
      onClick={handleLike}
    >
      {liked ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart className="text-gray-500" />}
    </motion.button>
  );
}
