"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../app/providers"; // Import useTheme hook

export default function TopNav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme(); // Get theme and toggle function
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/meme-explorer", label: "Meme Explorer" },
    { href: "/upload", label: "Upload Meme" },
    { href: "/profile", label: "Profile" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 top-0 px-6 py-4 shadow-md flex justify-between items-center ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold">
        <Link href="/">😂 Memeverse</Link>
      </h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`px-4 py-2 rounded-lg transition ${
                pathname === href
                  ? "bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Dark Mode Toggle (Desktop) */}
      <button
        onClick={toggleTheme}
        className="hidden md:block p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div
          className={`absolute top-16 left-0 w-full shadow-lg md:hidden transition-transform transform ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          } ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        >
          <ul className="flex flex-col items-center space-y-4 py-6">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block px-6 py-3 text-lg rounded-lg transition hover:bg-gray-300 dark:hover:bg-gray-700"
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Dark Mode Toggle (Mobile) */}
          <button
            onClick={toggleTheme}
            className="block mx-auto mt-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      )}
    </nav>
  );
}
