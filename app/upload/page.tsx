"use client";

import { useState } from "react";
import Image from "next/image";

export default function MemeUploadForm() {
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
        alert("Meme uploaded successfully!");
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
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-30">
      <h2 className="text-2xl font-bold text-center mb-4">Upload Your Meme</h2>

      <input type="file" accept="image/*,video/gif" onChange={handleFileChange} className="p-2 border rounded w-full" />

      {preview && (
        <div className="mt-4">
          <Image src={preview} alt="Meme Preview" width={300} height={300} className="rounded-lg" />
        </div>
      )}

      <textarea
        className="w-full p-2 border rounded mt-4"
        placeholder="Add a funny caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <button
        type="button"
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4 w-full"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Meme 🚀"}
      </button>
    </div>
  );
}
