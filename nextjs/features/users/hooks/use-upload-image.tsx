import { useState, useEffect } from "react";

interface ImageData {
  file_data: string;
  file_name: string;
}

export const useSingleImageUpload = (initialUrl: string = "") => {
  const [image, setImage] = useState<ImageData | null>(
    initialUrl ? { file_data: initialUrl, file_name: "" } : null
  );

  useEffect(() => {
    if (initialUrl) {
      const file = new File([initialUrl], "image.png", { type: "image/png" });
      const reader = new FileReader();
      const img = new Image();
      img.onload = () => {
        setImage({
          file_data: reader.result as string,
          file_name: file.name,
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
      img.onload = () => {
        const imageData: ImageData = {
          file_data: e.target?.result as string,
          file_name: file.name,
        };

        setImage(imageData);
      };
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  return { image, handleImageChange };
};
