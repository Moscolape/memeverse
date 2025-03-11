"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import LikeButton from "../../../components/like-button";
import CommentSection from "../../../components/comment-section";
import ShareButtons from "../../../components/share-buttons";
import { Meme } from "@/app/meme-explorer/meme-explorer";

export default function MemeDetailsPage() {
  const { id } = useParams(); // Get meme ID from URL
  const [meme, setMeme] = useState<Meme | null>(null);

  useEffect(() => {
    async function fetchMeme() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      const foundMeme = data.data.memes.find((m: Meme) => m.id === id);
      setMeme(foundMeme);
    }

    if (id) fetchMeme();
  }, [id]);

  if (!meme) return <p className="text-center mt-10">Loading meme...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg my-30">
      <h2 className="text-2xl font-bold text-center mb-4">{meme.name}</h2>
      <Image src={meme.url} alt={meme.name} width={meme.width} height={meme.height} className="rounded-lg mx-auto" />
      
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
