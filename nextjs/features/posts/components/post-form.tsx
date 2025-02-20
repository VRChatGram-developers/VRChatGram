import { useState } from "react";
import { createPost } from "../endpoint";
import styles from "../styles/post-form.module.scss";
import { ImageData } from "../types";

export const PostForm = ({ onClose }: { onClose: () => void }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [isSensitive, setIsSensitive] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [boothItems, setBoothItems] = useState<string[]>([]);
  const [errorBoothItems, setErrorBoothItems] = useState<string[]>([""]);
  const [errorTitle, setErrorTitle] = useState("");
  const [mainImage, setMainImage] = useState<ImageData | null>(null);

  const ageRestrictionOptions = [
    { label: "全年齢", isSensitive: false, value: "all" },
    { label: "18歳以上", isSensitive: true, value: "18" },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileList = Array.from(e.target.files);
      fileList.forEach((file) => {
        if (images.length >= 4) {
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image() as HTMLImageElement;
          img.onload = () => {
            const imageData: ImageData = {
              file: file,
              file_data: e.target?.result as string,
              width: img.width,
              height: img.height,
            };
            if (images.length === 0) {
              setMainImage(imageData);
            }
            setImages((prevImages) => [...prevImages, imageData]);
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleChangeMainImage = (index: number) => {
    setMainImage(images[index]);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagRemove = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      e.preventDefault();
    }
  };

  const handleCheckboxChange = (value: string) => {
    if (value === "all") {
      setIsSensitive(false);
    } else {
      setIsSensitive(true);
    }
  };

  const handleBoothItemChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newBoothItems = [...boothItems];
    newBoothItems[index] = e.target.value;
    setBoothItems(newBoothItems);
  };

  const isValidBoothItemsLink = () => {
    if (boothItems.length === 0) {
      return true;
    }

    for (let index = 0; index < boothItems.length; index++) {
      try {
        new URL(boothItems[index]);
      } catch (error) {
        const errorMessage = "正しい形式のURLを入力してください";
        const newErrorBoothItems = [...errorBoothItems];
        newErrorBoothItems[index] = errorMessage;
        setErrorBoothItems(newErrorBoothItems);
      }
    }

    return errorBoothItems.length === 1;
  };

  const isValidTitle = () => {
    if (title === "") {
      setErrorTitle("タイトルを入力してください");
      return false;
    }
    return true;
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!isValidBoothItemsLink() || !isValidTitle()) {
      return;
    }

    try {
      await createPost({ title, description, boothItems, images, tags, isSensitive });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className="flex">
        {images.length === 0 ? (
          <div className="w-full p-24">
            <div>ここにドロップ&ドロップまたは</div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        ) : (
          <>
            <div className="w-1/2 p-10">
              <div>新規投稿</div>
              <div>タイトル</div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="画像の情報を入力してください"
              />
              {errorTitle && <div className={styles.error_message}>{errorTitle}</div>}
              <div>タグ</div>
              <div className="tag-input-container">
                <div className="tags">
                  {tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                      <button onClick={() => handleTagRemove(index)}>x</button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyDown={handleTagInputKeyDown}
                    placeholder="タグを入力してEnterを押してください"
                    className="tag-input"
                  />
                </div>
              </div>
              <div>
                <div>年齢制限</div>
                <div>
                  {ageRestrictionOptions.map((option) => (
                    <label key={option.value} style={{ display: "block", margin: "5px 0" }}>
                      <input
                        type="checkbox"
                        name="ageRestriction"
                        value={option.value}
                        checked={option.isSensitive === isSensitive}
                        onChange={() => handleCheckboxChange(option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <div>作品説明</div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="作品の説明を入力してください"
                />
              </div>
              <div>
                <div>使用した素材</div>
                {boothItems.map((boothItem, index) => (
                  <div key={index}>
                    <form>
                      <input
                        type="text"
                        value={boothItem}
                        onChange={(e) => handleBoothItemChange(e, index)}
                        placeholder={`フォーム ${index + 1}`}
                      />
                      {errorBoothItems[index] && (
                        <div className={styles.error_message}>{errorBoothItems[index]}</div>
                      )}
                    </form>
                  </div>
                ))}
                <button onClick={() => setBoothItems([...boothItems, ""])}>+</button>
                <button
                  className="pl-2"
                  onClick={() =>
                    setBoothItems(boothItems.filter((_, i) => i !== boothItems.length - 1))
                  }
                >
                  -
                </button>
              </div>
            </div>
            <div className="w-1/2">
              <div>投稿画像 {images.length}/4</div>
              <div className="flex flex-wrap gap-4">
                <div className={styles.image_container}>
                  {mainImage && (
                    <img
                      src={URL.createObjectURL(mainImage.file)}
                      alt="Uploaded"
                      width={500}
                      height={500}
                    />
                  )}
                </div>
                {images.map((image, index) => (
                  <div key={index} onClick={() => handleChangeMainImage(index)}>
                    <img
                      src={URL.createObjectURL(image.file)}
                      alt="Uploaded"
                      width={100}
                      height={100}
                    />
                    {index !== 0 && <button onClick={() => handleImageRemove(index)}>x</button>}
                  </div>
                ))}
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            </div>
            <div className={styles.submit_button}>
              <button onClick={handleSubmit}>投稿する</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
