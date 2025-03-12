"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import LikeButton from "../../../components/like-button";
import CommentSection from "../../../components/comment-section";
import ShareButtons from "../../../components/share-buttons";
import { Meme } from "@/app/meme-explorer/meme-explorer";
import { useTheme } from "../../providers"; // Import Theme Context

export default function MemeDetailsPage() {
  const { id } = useParams(); // Get meme ID from URL
  const { theme } = useTheme(); // Get current theme from context
  const [meme, setMeme] = useState<Meme | null>(() => null);
  const [loading, setLoading] = useState(true);

  // Fetch meme details
  const fetchMeme = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.imgflip.com/get_memes");
      if (!res.ok) throw new Error("Failed to fetch memes");
      const data = await res.json();
      const foundMeme = data.data.memes.find((m: Meme) => m.id === id);

      if (!foundMeme) throw new Error("Meme not found");
      setMeme(foundMeme);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchMeme();
  }, [id, fetchMeme]);

  if (loading) {
    return <p className="text-center mt-10 animate-pulse">Loading meme...</p>;
  }

  if (!meme) {
    return <p className="text-center mt-10">Meme not found.</p>;
  }

  return (
    <div
      className={`max-w-3xl mx-auto p-6 shadow-lg rounded-lg transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold text-center mb-4">{meme.name}</h2>
      <Image
        src={meme.url}
        alt={meme.name}
        width={meme.width}
        height={meme.height}
        className="rounded-lg mx-auto"
        priority
      />

      {/* Like & Share Buttons */}
      <div className="flex justify-between items-center mt-4">
        <LikeButton memeId={meme.id} />
        <ShareButtons memeId={meme.id} />
      </div>

      {/* Comment Section */}
      <CommentSection memeId={meme.id} />
    </div>
  );
}
