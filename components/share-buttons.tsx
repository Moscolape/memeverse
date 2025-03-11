"use client";

import { FaTwitter, FaFacebook, FaLink } from "react-icons/fa";

export default function ShareButtons({ memeId }: { memeId: string }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/meme/${memeId}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex gap-3">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-2xl"
      >
        <FaTwitter />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 text-2xl"
      >
        <FaFacebook />
      </a>
      <button onClick={copyLink} className="text-gray-600 text-2xl">
        <FaLink />
      </button>
    </div>
  );
}
