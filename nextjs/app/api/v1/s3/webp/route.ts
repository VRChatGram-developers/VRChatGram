// app/api/convert-to-webp/route.ts
import sharp from "sharp";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file") as File | null;
  const widthStr = formData.get("width")?.toString();
  const width = widthStr ? parseInt(widthStr, 10) : 640;

  if (!file) {
    return new Response("No file provided", { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const webpBuffer = await sharp(buffer)
    .resize({ width, fit: "inside" })
    .webp({ quality: 75 })
    .toBuffer();

  return new Response(webpBuffer, {
    headers: {
      "Content-Type": "image/webp",
      "Content-Disposition": 'inline; filename="converted.webp"',
    },
  });
}
