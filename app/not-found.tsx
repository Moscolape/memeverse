"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./providers"; // Import theme context

export default function NotFoundPage() {
  const { theme } = useTheme(); // Get the theme state

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen text-center transition-colors ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl mt-2">Oops! You took a wrong turn. 🤦‍♂️</h2>

      {/* Funny Meme */}
      <div className="relative w-80 h-80 mt-6">
        <Image
          src="https://i.imgflip.com/2fm6x.jpg"
          alt="Waiting skeleton"
          layout="fill"
          objectFit="contain"
        />
      </div>

      {/* Go Home Button */}
      <Link href="/">
        <button
          className={`mt-6 px-6 py-3 rounded-lg font-semibold text-lg transition ${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Take Me Home 🏠
        </button>
      </Link>
    </div>
  );
}
