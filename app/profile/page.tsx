"use client";

import { useEffect, useState } from "react";
import ProfileForm from "../../components/profile-form";
import LikedMemes from "../../components/liked-memes";
import UploadedMemes from "../../components/uploaded-memes";

export default function ProfilePage() {
  const [user, setUser] = useState({ name: "", bio: "", avatar: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userProfile") || "{}");
    setUser(storedUser);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg my-30">
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
