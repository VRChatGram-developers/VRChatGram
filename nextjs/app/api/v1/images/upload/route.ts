import { NextRequest, NextResponse } from "next/server";
import { S3Service } from "@/app/api/services/s3-service";

const uploadImage = async (image: {
  file_data: string;
  file_name: string;
  width: number;
  height: number;
}) => {
  const s3Service = new S3Service();
  const url = await s3Service.uploadFileToS3(image.file_data, image.file_name);
  return { url: url, width: image.width, height: image.height };
};

export async function POST(request: NextRequest) {
  const { image } = await request.json();
  const serializedImages = await uploadImage(image);

  return NextResponse.json(serializedImages);
}
