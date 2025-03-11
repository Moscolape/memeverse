"use client";

import Image from "next/image";
import { useState } from "react";

interface User {
  name: string;
  bio: string;
  avatar: string;
}

interface ProfileFormProps {
  user: User;
  setUser: (user: User) => void;
}

export default function ProfileForm({ user, setUser }: ProfileFormProps) {
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [avatar, setAvatar] = useState(user.avatar || "/default-avatar.png");

  const handleSave = () => {
    const updatedUser = { name, bio, avatar };
    localStorage.setItem("userProfile", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);

      // Cleanup URL to prevent memory leaks
      URL.revokeObjectURL(imageUrl);
    }
  };

  return (
    <div className="text-center">
      <Image 
        src={avatar} 
        alt="Profile" 
        width={96} 
        height={96} 
        className="w-24 h-24 rounded-full mx-auto"
      />
      <input type="file" accept="image/*" onChange={handleAvatarChange} className="mt-2" />
      
      <input 
        type="text" 
        placeholder="Your Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="block w-full border p-2 mt-4"
      />
      
      <textarea 
        placeholder="Your Bio" 
        value={bio} 
        onChange={(e) => setBio(e.target.value)} 
        className="block w-full border p-2 mt-2"
      />

      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Save
      </button>
    </div>
  );
}
