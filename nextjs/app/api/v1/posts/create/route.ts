import { NextResponse } from "next/server";
import { PhotoTypeRepositoryImpl } from "@/app/api/repository/photo-type-repository-impl";
import { PhotoTypeServiceImpl } from "@/app/api/services/photo-type-service-impl";
import { PhotoTypeService } from "@/app/api/services/photo-type-service";

export async function GET() {
  const photoTypeService: PhotoTypeService = new PhotoTypeServiceImpl(
    new PhotoTypeRepositoryImpl()
  );
  const photoTypes = await photoTypeService.fetchPhotoTypes();
  try {
    return NextResponse.json(photoTypes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
