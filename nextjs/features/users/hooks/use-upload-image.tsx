import { useState, useEffect } from "react";

interface ImageData {
  file: File | null;
  file_data: string;
  file_name: string;
  preview_url: string;
  width: number;
  height: number;
}

export const useSingleImageUpload = (initialUrl: string = "") => {
  const [image, setImage] = useState<ImageData | null>(
    initialUrl ? { file: null, file_data: initialUrl, file_name: "", preview_url: initialUrl, width: 0, height: 0 } : null
  );

  useEffect(() => {
    if (initialUrl) {
      const file = new File([initialUrl], "image.png", { type: "image/png" });
      const reader = new FileReader();
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          file: file,
          file_data: reader.result as string,
          file_name: file.name,
          preview_url: objectUrl,
          width: img.width,
          height: img.height,
        });
      };
      img.src = initialUrl;
    }
  }, [initialUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        const imageData: ImageData = {
          file: file,
          file_data: e.target?.result as string,
          file_name: file.name,
          preview_url: objectUrl,
          width: img.width,
          height: img.height,
        };

        setImage(imageData);
      };
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  // 画像をリセットする
  const resetImage = () => {
    setImage({ file: null, file_data: "", file_name: "", preview_url: "", width: 0, height: 0 });
  };

  return { image, handleImageChange, resetImage };
};
