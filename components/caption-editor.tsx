"use client";

export default function CaptionEditor({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <textarea
      className="w-full p-2 border rounded"
      placeholder="Write a funny caption..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
