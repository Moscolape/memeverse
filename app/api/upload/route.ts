import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import { Readable } from "stream";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import type { Files } from "formidable";
import { IncomingMessage } from "http";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🚀 Next.js API Route Configuration
export const config = {
  api: {
    bodyParser: false, // Required to use formidable
  },
};

// 🛠 Convert NextRequest to a Node.js ReadableStream (mimicking IncomingMessage)
async function requestToStream(req: NextRequest): Promise<IncomingMessage> {
  const readable = new Readable({
    read() {},
  });

  const reader = req.body?.getReader();
  if (!reader) throw new Error("No request body found");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    readable.push(Buffer.from(value)); // ✅ Convert Uint8Array to Buffer
  }

  readable.push(null); // End the stream

  return Object.assign(readable, {
    headers: Object.fromEntries(req.headers), // Convert Headers to plain object
    method: req.method,
    url: req.url,
  }) as IncomingMessage;
}

// ✅ Upload handler
export const POST = async (req: NextRequest) => {
  try {
    const stream = await requestToStream(req); // Convert NextRequest to IncomingMessage
    const form = new IncomingForm();

    // Parse form data properly
    const { files }: { files: Files } = await new Promise((resolve, reject) => {
      form.parse(stream, (err, _, files) => {
        if (err) reject(err);
        else resolve({ files });
      });
    });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file || !file.filepath) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.filepath, {
      folder: "memes",
    });

    // Delete temp file
    await fs.unlink(file.filepath);

    return NextResponse.json({ url: uploadResult.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 500 });
  }
};
