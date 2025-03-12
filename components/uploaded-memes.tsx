"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import initializeAOS from "@/utils/aos-init";

interface Meme {
  url: string;
  caption: string;
}

export default function UploadedMemes() {
  const [uploadedMemes, setUploadedMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const memes = JSON.parse(localStorage.getItem("uploadedMemes") || "[]") as Meme[];
    setUploadedMemes(memes);
  }, []);

  useEffect(() => {
    initializeAOS();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 mt-4" data-aos="fade-up">
      {uploadedMemes.length === 0 ? (
        <p>No memes uploaded yet.</p>
      ) : (
        uploadedMemes.map((meme, index) => (
          meme.url && meme.url.trim() ? (
            <div key={index} className="bg-gray-300 p-4 rounded-lg shadow-md text-black">
              <Image src={meme.url} alt="Uploaded Meme" width={300} height={300} className="rounded-lg" />
              <p className="mt-2 text-center font-semibold">{meme.caption}</p>
            </div>
          ) : null
        ))
      )}
    </div>
  );
}