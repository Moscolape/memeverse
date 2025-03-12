"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

export default function CommentSection({ memeId }: { memeId: string }) {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  // Load comments from localStorage
  const storedComments = useMemo(() => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("comments");
    return data ? JSON.parse(data)[memeId] || [] : [];
  }, [memeId]);

  useEffect(() => {
    setComments(storedComments);
  }, [storedComments]);

  // Update localStorage with debouncing
  const updateLocalStorage = useCallback((updatedComments: string[]) => {
    const allComments = JSON.parse(localStorage.getItem("comments") || "{}");
    allComments[memeId] = updatedComments;
    localStorage.setItem("comments", JSON.stringify(allComments));
  }, [memeId]);

  const handleAddComment = useCallback(() => {
    if (!newComment.trim()) return;

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    updateLocalStorage(updatedComments);
    setNewComment("");
  }, [newComment, comments, updateLocalStorage]);

  // Sync comments across multiple tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "comments") {
        const newComments = JSON.parse(event.newValue || "{}")[memeId] || [];
        setComments(newComments);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [memeId]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Comments</h3>
      <ul className="mt-2">
        {comments.map((comment, index) => (
          <li key={index} className="border-b py-2">{comment}</li>
        ))}
      </ul>

      <div className="mt-4 flex">
        <input
          type="text"
          className="border p-2 flex-grow rounded-l"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r"
          onClick={handleAddComment}
        >
          Post
        </button>
      </div>
    </div>
  );
}