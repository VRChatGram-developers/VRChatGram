import { useState } from "react";
import Image from "next/image";

type ImageData = {
  file: File;
  url: string;
  width: number;
  height: number;
};

export const PostForm = ({ onClose }: { onClose: () => void }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [isSensitive, setIsSensitive] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [formsCount, setFormsCount] = useState<number[]>([0]);
  const [boothItems, setBoothItems] = useState<{ [key: string]: string }>({});

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
              file,
              url: e.target?.result as string,
              width: img.width,
              height: img.height,
            };
            setImages((prevImages) => [...prevImages, imageData]); // 画像情報を追加
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      e.preventDefault(); // フォームの送信を防ぐ
    }
  };

  const handleCheckboxChange = (value: string) => {
    if (value === "all") {
      setIsSensitive(false);
    } else {
      setIsSensitive(true);
    }
  };

  const handleTagRemove = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const addForm = () => {
    setFormsCount([...formsCount, formsCount.length]); // 新しいフォームを追加
  };

  const removeForm = () => {
    setFormsCount(formsCount.filter((_, i) => i !== formsCount.length - 1)); // 指定したインデックスのフォームを削除
  };

  const handleBoothItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBoothItems = { ...boothItems };
    newBoothItems[e.target.name] = e.target.value;
    setBoothItems(newBoothItems);
    console.log(boothItems);
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const post = {
      title,
      description,
      boothItems,
      images,
      tags,
      isSensitive,
    };
  };

  return (
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
              <div>使用した素材</div>
              {formsCount.map((_, index) => (
                <div key={index}>
                  <form>
                    <input
                      type="text"
                      value={boothItems[index]}
                      onChange={handleBoothItemChange}
                      placeholder={`フォーム ${index + 1}`}
                    />
                  </form>
                </div>
              ))}
              <button onClick={addForm}>+</button>
              <button onClick={() => removeForm}>-</button>
            </div>
          </div>
          <div className="w-1/2">
            <div>投稿画像</div>
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={URL.createObjectURL(image.file)}
                    alt="Uploaded"
                    width={300}
                    height={300}
                  />
                  {index !== 0 && <button onClick={() => handleImageRemove(index)}>x</button>}
                </div>
              ))}
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>
          <div>
            <button onClick={handleSubmit}>投稿する</button>
          </div>
        </>
      )}
    </div>
  );
};
