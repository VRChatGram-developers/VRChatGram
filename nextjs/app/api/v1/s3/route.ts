// app/api/upload-url/route.ts

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(req: Request) {
  const { fileName, contentType } = await req.json();

  if (!fileName || !contentType) {
    return new Response(JSON.stringify({ error: "Missing fileName or contentType" }), {
      status: 400,
    });
  }

  const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key:`originals/${fileName}`,
    ContentType: contentType,
    ACL: "public-read",
  });

  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
    return new Response(JSON.stringify({ url: signedUrl }), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ error: "An unknown error occurred" }), { status: 500 });
  }
}
