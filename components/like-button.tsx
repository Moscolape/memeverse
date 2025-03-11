"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function LikeButton({ memeId }: { memeId: string }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes") || "{}");
    setLiked(storedLikes[memeId] || false);
  }, [memeId]);

  const handleLike = () => {
    const updatedLikes = { ...JSON.parse(localStorage.getItem("likes") || "{}"), [memeId]: !liked };
    localStorage.setItem("likes", JSON.stringify(updatedLikes));
    setLiked(!liked);
  };

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
