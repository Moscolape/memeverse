"use client";

import { useReducer, useCallback, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "../providers"; // Import Theme Context
import { motion } from "framer-motion";

// Define action types
type State = {
  file: File | null;
  preview: string | null;
  caption: string;
  uploading: boolean;
};

type Action =
  | { type: "SET_FILE"; payload: File | null }
  | { type: "SET_PREVIEW"; payload: string | null }
  | { type: "SET_CAPTION"; payload: string }
  | { type: "SET_UPLOADING"; payload: boolean };

// Reducer function to manage state
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FILE":
      return { ...state, file: action.payload };
    case "SET_PREVIEW":
      return { ...state, preview: action.payload };
    case "SET_CAPTION":
      return { ...state, caption: action.payload };
    case "SET_UPLOADING":
      return { ...state, uploading: action.payload };
    default:
      return state;
  }
};

export default function MemeUploadForm() {
  const { theme } = useTheme(); // Get current theme from context
  const [state, dispatch] = useReducer(reducer, {
    file: null,
    preview: null,
    caption: "",
    uploading: false,
  });

  const { file, preview, caption, uploading } = state;

  // Handle file selection
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (!selectedFile) return;

      // Clean up previous preview
      if (preview) URL.revokeObjectURL(preview);

      dispatch({ type: "SET_FILE", payload: selectedFile });
      dispatch({ type: "SET_PREVIEW", payload: URL.createObjectURL(selectedFile) });
    },
    [preview]
  );

  // Handle upload
  const handleUpload = useCallback(async () => {
    if (!file) return alert("Please select a file");

    dispatch({ type: "SET_UPLOADING", payload: true });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload meme.");
      }

      const { url } = await response.json();
      console.log("Uploaded Image URL:", url);

      // Store the uploaded meme in localStorage
      const newMeme = { url, caption };
      const existingMemes = JSON.parse(localStorage.getItem("uploadedMemes") || "[]");
      localStorage.setItem("uploadedMemes", JSON.stringify([...existingMemes, newMeme]));

      alert("Meme uploaded successfully!");
      dispatch({ type: "SET_FILE", payload: null });
      dispatch({ type: "SET_PREVIEW", payload: null });
      dispatch({ type: "SET_CAPTION", payload: "" });
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      dispatch({ type: "SET_UPLOADING", payload: false });
    }
  }, [file, caption]);

  // Clean up preview URL when the component unmounts
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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
        disabled={uploading}
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
        onChange={(e) => dispatch({ type: "SET_CAPTION", payload: e.target.value })}
        disabled={uploading}
      />

      <button
        type="button"
        onClick={handleUpload}
        className={`px-4 py-2 rounded mt-4 w-full transition ${
          theme === "dark"
            ? "bg-blue-600 text-white hover:bg-blue-500"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={uploading || !file}
      >
        {uploading ? "Uploading..." : "Upload Meme 🚀"}
      </button>
    </motion.div>
  );
}
