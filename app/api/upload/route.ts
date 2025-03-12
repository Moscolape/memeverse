import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import type { Files } from "formidable";
import { IncomingMessage } from "http";
import { Readable } from "stream";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable default body parsing in Next.js API
export const config = {
  api: {
    bodyParser: false,
  },
};

// Convert NextRequest to a Readable Stream
async function requestToStream(req: NextRequest): Promise<IncomingMessage> {
  const reader = req.body?.getReader();
  if (!reader) throw new Error("Request body is missing");

  const readable = new Readable({
    read() {},
  });

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    readable.push(Buffer.from(value)); // Convert Uint8Array to Buffer
  }

  readable.push(null); // Signal end of stream

  return Object.assign(readable, {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: req.url,
  }) as IncomingMessage;
}

// File upload handler
export const POST = async (req: NextRequest) => {
  try {
    const stream = await requestToStream(req);
    const form = new IncomingForm();

    // Parse form data
    const { files }: { files: Files } = await new Promise((resolve, reject) => {
      form.parse(stream, (err, _, files) => (err ? reject(err) : resolve({ files })));
    });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file?.filepath) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.filepath, {
      folder: "memes",
      use_filename: true,
      resource_type: "auto",
    });

    // Delete temp file after upload
    await fs.unlink(file.filepath);

    return NextResponse.json({ url: uploadResult.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
};
