"use client";

import { useState, useEffect } from "react";

export default function CommentSection({ memeId }: { memeId: string }) {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments") || "{}");
    setComments(storedComments[memeId] || []);
  }, [memeId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify({ ...JSON.parse(localStorage.getItem("comments") || "{}"), [memeId]: updatedComments }));
    setNewComment("");
  };

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
