"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../app/providers"; // Import useTheme hook

export default function TopNav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme(); // Get theme and toggle function from context

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/meme-explorer", label: "Meme Explorer" },
    { href: "/upload", label: "Upload Meme" },
    { href: "/profile", label: "Profile" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  return (
    <nav className={`flex justify-between items-center px-6 py-4 shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      {/* Logo */}
      <h1 className="text-2xl font-bold">
        <Link href="/">😂 Memeverse</Link>
      </h1>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`px-4 py-2 rounded-lg transition ${
                pathname === href ? "bg-gray-300 text-gray-900" : "hover:bg-gray-300 hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-200 hover:text-gray-900 transition cursor-pointer"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
  );
}
