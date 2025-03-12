"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

interface User {
  name: string;
  bio: string;
  avatar: string;
}

interface ProfileFormProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export default function ProfileForm({ user, setUser }: ProfileFormProps) {
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);

      setUploading(true);
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          setUser((prev) => ({ ...prev, avatar: data.url }));
        } else {
          throw new Error(data.error || "Upload failed.");
        }
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    setEditing(false);
  };

  return (
    <motion.div
      className="max-w-md mx-auto text-center bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Profile
      </h2>

      {/* Profile Image */}
      <Image
        src={user.avatar || "/default-avatar.png"}
        alt="Profile"
        width={96}
        height={96}
        className="w-24 h-24 rounded-full mx-auto"
      />

      {/* Edit Mode */}
      {editing ? (
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Your Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="block w-full border p-2 rounded mt-4"
          />

          <textarea
            placeholder="Your Bio"
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
            className="block w-full border p-2 rounded mt-2"
          />

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-blue-600"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Save"}
          </button>
        </div>
      ) : (
        // Display Mode
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {user.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{user.bio}</p>

          <button
            onClick={() => setEditing(true)}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-gray-600"
          >
            Edit Profile
          </button>
        </div>
      )}
    </motion.div>
  );
}
