"use client";

import { useState } from "react";
import Image from "next/image";
import { useTheme } from "../providers"; // Import Theme Context
import { motion } from "framer-motion";

export default function MemeUploadForm() {
  const { theme } = useTheme(); // Get current theme from context
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Uploaded Image URL:", data.url);

        // Store the uploaded meme in localStorage
        const newMeme = { url: data.url, caption };
        const existingMemes = JSON.parse(
          localStorage.getItem("uploadedMemes") || "[]"
        );
        localStorage.setItem(
          "uploadedMemes",
          JSON.stringify([...existingMemes, newMeme])
        );

        alert("Meme uploaded successfully!");
        setFile(null);
        setPreview(null);
        setCaption("");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload meme.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      className={`max-w-lg mx-auto shadow-lg rounded-lg p-6 pt-30 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">Upload Your Meme</h2>

      <input
        type="file"
        accept="image/*,video/gif"
        onChange={handleFileChange}
        className={`p-2 border rounded w-full ${
          theme === "dark"
            ? "bg-gray-800 border-gray-600 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      />

      {preview && (
        <div className="mt-4">
          <Image
            src={preview}
            alt="Meme Preview"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
      )}

      <textarea
        className={`w-full p-2 border rounded mt-4 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-600 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
        placeholder="Add a funny caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <button
        type="button"
        onClick={handleUpload}
        className={`px-4 py-2 rounded mt-4 w-full transition ${
          theme === "dark"
            ? "bg-blue-600 text-white hover:bg-blue-500"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Meme 🚀"}
      </button>
    </motion.div>
  );
}
