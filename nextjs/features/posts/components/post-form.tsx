import { useRef, useState } from "react";
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
  const [boothItems, setBoothItems] = useState<string[]>([""]);
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
          const img = new Image();
          img.onload = () => {
            const imageData = {
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

  const handleBoothItemChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
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

  const addBoothItem = () => {
    setBoothItems([...boothItems, ""]);
  };

  const removeBoothItem = (index: number) => {
    setBoothItems(boothItems.filter((_, i) => i !== index));
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!isValidBoothItemsLink() || !isValidTitle()) {
      return;
    }

    try {
      await createPost({
        title,
        description,
        boothItems,
        images,
        tags,
        isSensitive,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.container}>
      <div className="flex">
        {images.length === 0 ? (
          <div className="w-full p-24">
            <div>ここにドロップ&ドロップまたは</div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        ) : (
          <div className={styles.postContainer}>
            <div className={styles.postTitleContent}>
              <p className={styles.postTitle}>新規投稿</p>
            </div>
            <div className={styles.postDetailContainer}>
              <div className={styles.postDetailContent}>
                <div className={styles.postDetailTitleContainer}>
                  <p className={styles.postDetailTitleText}>タイトル</p>
                  <input
                    type="text"
                    value={title}
                    className={styles.postDetailTitleInput}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="タイトルを入力して下さい"
                  />
                  {errorTitle && (
                    <div className={styles.error_message}>{errorTitle}</div>
                  )}
                </div>

                <div className={styles.postDetailTagContainer}>
                  <p className={styles.postDetailTitleText}>タグ</p>
                  <div className={styles.postDetailTagContent}>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyDown={handleTagInputKeyDown}
                      placeholder="タグを入力してEnterを押してください"
                      className={styles.postDetailTagInput}
                    />
                    <div className={styles.postDetailTagArea}>
                      {tags.map((tag, index) => (
                        <div key={index} className={styles.postDetailTag}>
                          <p className={styles.postDetailTagText}>
                            #<span>{tag}</span>
                          </p>
                          <button
                            onClick={() => handleTagRemove(index)}
                            className={styles.postDetailTagClear}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.postDetailAgeLimitContainer}>
                  <p className={styles.postDetailTitleText}>年齢制限</p>
                  <div className={styles.postDetailAgeLimitContent}>
                    {ageRestrictionOptions.map((option) => (
                      <label
                        key={option.value}
                        className={styles.postDetailAgeLimitLabel}
                      >
                        <input
                          type="checkbox"
                          name="ageRestriction"
                          className={styles.postDetailAgeLimitInput}
                          value={option.value}
                          checked={option.isSensitive === isSensitive}
                          onChange={() => handleCheckboxChange(option.value)}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
                <div className={styles.postDetailTextAreaContainer}>
                  <p className={styles.postDetailTitleText}>作品説明</p>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.postDetailTextArea}
                    placeholder="作品の説明を入力してください"
                  />
                </div>
                <div className={styles.postDetailMaterialContainer}>
                  <p className={styles.postDetailTitleText}>使用した素材</p>
                  <div className={styles.postDetailMaterialContent}>
                    {boothItems.map((boothItem, index) => (
                      <div
                        key={index}
                        className={styles.postDetailMaterialFormContainer}
                      >
                        <form className={styles.postDetailMaterialForm}>
                          <input
                            type="text"
                            value={boothItem}
                            onChange={(e) => handleBoothItemChange(e, index)}
                            className={styles.postDetailMaterialFormInput}
                            placeholder={`BoothのURLを貼って下さい`}
                          />
                          {errorBoothItems[index] && (
                            <div className={styles.error_message}>
                              {errorBoothItems[index]}
                            </div>
                          )}
                        </form>
                        <div
                          className={
                            styles.postDetailMaterialFormButtonContainer
                          }
                        >
                          {index !== boothItems.length - 1 && (
                            <button
                              className={styles.postDetailMaterialFormButton}
                              onClick={() => removeBoothItem(index)}
                              type="button"
                            >
                              -
                            </button>
                          )}
                          {index === boothItems.length - 1 && (
                            <button
                              className={styles.postDetailMaterialFormButton}
                              onClick={addBoothItem}
                              type="button"
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.postImageContainer}>
                <div className={styles.postImageQuanityLimitContainer}>
                  <p className={styles.postImageQuanityLimitText}>
                    投稿画像 {images.length}/4
                  </p>
                </div>

                <div className={styles.postImageContentContainer}>
                  <div className={styles.postImageContentContent}>
                    {mainImage && (
                      <img
                        src={URL.createObjectURL(mainImage.file)}
                        className={styles.postMainImage}
                        alt="Uploaded"
                        width={500}
                        height={500}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.postImageInputContainer}>
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={styles.postImageContent}
                      onClick={() => handleChangeMainImage(index)}
                    >
                      <img
                        src={URL.createObjectURL(image.file)}
                        alt="Uploaded"
                        width={500}
                        height={500}
                        className={styles.postImage}
                      />
                      {index !== 0 && (
                        <button
                          className={styles.postImageClearButton}
                          onClick={() => handleImageRemove(index)}
                        >
                          x
                        </button>
                      )}
                    </div>
                  ))}

                  {images.length < 4 && (
                    <div className={styles.postImageAddComtainer}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        hidden
                      />
                      <button
                        className={styles.postImageAddButton}
                        onClick={() => fileInputRef.current?.click()}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.submitContainer}>
              <button onClick={handleSubmit}>
                <p className={styles.postButtonText}>投稿する</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
