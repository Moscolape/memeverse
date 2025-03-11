"use client";

import { useState } from "react";
import Image from "next/image";

export default function MemeUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUploadedUrl(data.url);
        setFile(null);
        setPreview(null);
        setCaption("");
        alert("Meme uploaded successfully! 🚀");
      } else {
        throw new Error(data.error || "Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Upload Your Meme</h2>

      <input
        type="file"
        accept="image/*,video/gif"
        onChange={handleFileChange}
        className="p-2 border rounded w-full"
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
        className="w-full p-2 border rounded mt-4"
        placeholder="Add a funny caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        type="button"
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4 w-full"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Meme 🚀"}
      </button>

      {uploadedUrl && (
        <div className="mt-4 text-center">
          <p className="text-green-600 font-semibold">Meme uploaded!</p>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Meme
          </a>
        </div>
      )}
    </div>
  );
}
