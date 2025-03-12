"use client";

import { useEffect, useState } from "react";
import ProfileForm from "../../components/profile-form";
import LikedMemes from "../../components/liked-memes";
import UploadedMemes from "../../components/uploaded-memes";
import { useTheme } from "../providers";

export default function ProfilePage() {
  const [user, setUser] = useState({ name: "", bio: "", avatar: "" });
  const { theme } = useTheme(); // Get current theme from context


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userProfile") || "{}");
    setUser(storedUser);
  }, []);

  return (
    <div className={`max-w-5xl mx-auto p-6 ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
    } shadow-lg rounded-lg py-30`} >
      {/* Profile Form */}
      <ProfileForm user={user} setUser={setUser} />

      {/* Uploaded Memes */}
      <h2 className="text-2xl font-bold mt-6">Your Uploads</h2>
      <UploadedMemes />

      {/* Liked Memes */}
      <h2 className="text-2xl font-bold mt-6">Liked Memes</h2>
      <LikedMemes />
    </div>
  );
}
