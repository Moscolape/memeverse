"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Meme } from "@/app/meme-explorer/meme-explorer";


export default function UploadedMemes() {
  const [uploadedMemes, setUploadedMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const memes = JSON.parse(localStorage.getItem("uploadedMemes") || "[]") as Meme[];
    setUploadedMemes(memes);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {uploadedMemes.length === 0 ? (
        <p>No memes uploaded yet.</p>
      ) : (
        uploadedMemes.map((meme, index) => (
          <Image 
            key={index} 
            src={meme.url} 
            alt="Uploaded Meme" 
            width={300} 
            height={300} 
            className="rounded-lg shadow-md" 
          />
        ))
      )}
    </div>
  );
}
