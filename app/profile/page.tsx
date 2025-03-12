"use client";

import { useEffect, useState, useMemo } from "react";
import ProfileForm from "../../components/profile-form";
import LikedMemes from "../../components/liked-memes";
import UploadedMemes from "../../components/uploaded-memes";
import { useTheme } from "../providers";

export default function ProfilePage() {
  const { theme } = useTheme();

  // Lazy initialization to prevent unnecessary re-renders
  const storedUser = useMemo(
    () => JSON.parse(localStorage.getItem("userProfile") || "{}"),
    []
  );

  const [user, setUser] = useState(() => storedUser);

  useEffect(() => {
    if (!user.name) {
      setUser(storedUser);
    }
  }, [storedUser, user.name]);

  return (
    <div
      className={`max-w-5xl mx-auto p-6 shadow-lg rounded-lg py-30 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <ProfileForm user={user} setUser={setUser} />

      <section className="mt-6">
        <h2 className="text-2xl font-bold">Your Uploads</h2>
        <UploadedMemes />
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-bold">Liked Memes</h2>
        <LikedMemes />
      </section>
    </div>
  );
}
