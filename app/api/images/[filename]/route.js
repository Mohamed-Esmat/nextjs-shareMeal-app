import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { filename } = params;
  const filePath = path.join(process.cwd(), "public", "images", filename);
  try {
    const fileBuffer = await fs.promises.readFile(filePath);
    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    if (ext === ".png") contentType = "image/png";
    if (ext === ".webp") contentType = "image/webp";
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    return new NextResponse("Not Found", { status: 404 });
  }
}
