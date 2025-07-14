import { useRef, useState, useMemo } from "react";
import { updatePost, fetchS3SignedUrl } from "../../endpoint";
import styles from "@/features/posts/styles/post-edit-form.module.scss";
import { PostDetail, ImageDataForUpdate, Booth } from "../../types";
import { Id, Slide, toast } from "react-toastify";
import axios, { AxiosProgressEvent } from "axios";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { fetchPhotoTypes } from "@/features/posts/endpoint";
import { PhotoType } from "@/features/posts/types";

export const PostEditForm = ({ onClose, post }: { onClose: () => void; post: PostDetail }) => {
  const [images, setImages] = useState<ImageDataForUpdate[]>([]);
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [selectedAgeRestriction, setSelectedAgeRestriction] = useState<string>(
    post.show_sensitive_type.toString() || "all"
  );
  const [description, setDescription] = useState<string>("");
  const [boothItems, setBoothItems] = useState<Booth[]>([
    {
      id: "00000000-0000-0000-0000-000000000000",
      title: "",
      detail: "",
      url: "",
      image: "",
    },
  ]);
  const [errorBoothItems, setErrorBoothItems] = useState<string[]>([""]);
  const [errorTitle, setErrorTitle] = useState("");
  const [mainImage, setMainImage] = useState<ImageDataForUpdate | null>(null);
  const [isCompositionStart, setIsCompositionStart] = useState<boolean>(false);
  const [selectedPostTypes, setSelectedPostTypes] = useState<string[]>([""]);
  const [photoTypes, setPhotoTypes] = useState<PhotoType[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useMemo(() => {
    setTitle(post.title);
    setTags(post.tags.map((tag) => tag.tag.name));
    setDescription(post.description);
    setSelectedPostTypes(post.post_photo_types.map((photoType) => photoType.photo_type.id));
    setPhotoTypes(post.post_photo_types.map((photoType) => photoType.photo_type));
    if (post.booth_items.length > 0) {
      setBoothItems(post.booth_items.map((boothItem) => boothItem.booth));
    } else {
      setBoothItems([
        {
          id: "00000000-0000-0000-0000-000000000000",
          title: "",
          detail: "",
          url: "",
          image: "",
        },
      ]);
    }

    if (post.images.length > 0) {
      setMainImage({
        id: post.images[0].id.toString(),
        file: new File([], post.images[0].url),
        file_data: post.images[0].url,
        file_name: post.images[0].url,
        width: post.images[0].width,
        height: post.images[0].height,
      });
      const imagePromises = post.images.map(async (image) => ({
        id: image.id,
        file: new File([], image.url),
        file_data: image.url,
        file_name: image.url,
        width: image.width,
        height: image.height,
      }));
      Promise.all(imagePromises).then((resolvedImages) => {
        return setImages(
          resolvedImages.map((image) => ({
            ...image,
            id: image.id.toString(),
          }))
        );
      });

      fetchPhotoTypes().then((photoTypes) => {
        setPhotoTypes(photoTypes);
      });
    }
  }, [post]);

  const ageRestrictionOptions = [
    { label: "全年齢", isSensitive: false, value: "all" },
    { label: "18歳以上", isSensitive: true, value: "safe" },
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
          const img = new (globalThis.Image as any)();
          img.onload = () => {
            const imageData = {
              id: "00000000-0000-0000-0000-000000000000",
              file: file,
              file_data: e.target?.result as string,
              file_name: file.name,
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

  const handleCompositionStart = () => setIsCompositionStart(true);

  const handleCompositionEnd = () => setIsCompositionStart(false);

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagRemove = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isCompositionStart) {
      const tag = tagInput.trim();
      e.preventDefault();
      // 同じタグが入力されたら、タグを追加しない
      if (!tags.includes(tag)) {
        setTags([...tags, tag]);
      }
      setTagInput("");
    }
  };

  const handleCheckboxChange = (value: string) => {
    if (value === "all") {
      setSelectedAgeRestriction(value);
    } else {
      setSelectedAgeRestriction(value);
    }
  };

  const handleBoothItemChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newBoothItems = [...boothItems];
    newBoothItems[index] = {
      ...boothItems[index],
      url: e.target.value,
    };
    setBoothItems(newBoothItems);
  };

  const isValidBoothItemsLink = () => {
    setErrorBoothItems([]);
    if (boothItems.length === 0 || boothItems.every((item) => item.url === "")) {
      return true;
    }

    for (let index = 0; index < boothItems.length; index++) {
      try {
        new URL(boothItems[index].url);
        if (!boothItems[index].url.includes("https://booth.pm/")) {
          throw new Error();
        }
      } catch (error) {
        const errorMessage = "正しい形式のURLを入力してください";
        const newErrorBoothItems = [...errorBoothItems];
        newErrorBoothItems[index] = errorMessage;
        setErrorBoothItems(newErrorBoothItems);
      }
    }

    if (errorBoothItems.length >= 1) {
      return false;
    }

    return true;
  };

  const isValidTitle = () => {
    if (title === "") {
      setErrorTitle("タイトルを入力してください");
      return false;
    }

    if (title.length > 50) {
      setErrorTitle("タイトルは50文字以内で入力してください");
      return false;
    }

    return true;
  };

  const addBoothItem = () => {
    setBoothItems([
      ...boothItems,
      {
        id: "00000000-0000-0000-0000-000000000000",
        title: "",
        detail: "",
        url: "",
        image: "",
      },
    ]);
  };

  const removeBoothItem = (index: number) => {
    setBoothItems(boothItems.filter((_, i) => i !== index));
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePostImageTypeChange = (value: string) => {
    setSelectedPostTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    const isBoothItemsValid = isValidBoothItemsLink();
    const isTitleValid = isValidTitle();

    if (!isBoothItemsValid || !isTitleValid) {
      return;
    }

    onClose();

    const toastId = toast.loading("画像をアップロード中...", {
      autoClose: false, // 自動で閉じない
      closeButton: false, // 閉じるボタンを非表示
      progress: 0, // 初期進捗（0%）
    });

    // 画像をアップロード、ただしアップロード済みの画像はスキップ
    const postImages = await Promise.all(
      images.map(async (image) => {
        const imageUrl = await uploadImage(image.file, image.file_name, toastId);
        return {
          id: image.id,
          url: imageUrl,
          width: image.width,
          height: image.height,
        };
      })
    );

    if (toast.isActive(toastId)) {
      toast.update(toastId, {
        render: "画像をアップロード中...",
        type: "info",
        isLoading: true,
        autoClose: false,
        progress: 100, // 初期進捗（0%）
      });
    }

    try {
      await updatePost(post.id.toString(), {
        title,
        description,
        boothItems: boothItems.filter((boothItem) => boothItem.url !== ""),
        images: postImages,
        tags,
        show_sensitive_type: selectedAgeRestriction,
        photo_types: selectedPostTypes,
      });

      const toastId = toast.success("更新しました！", {
        isLoading: false,
        autoClose: false,
        transition: Slide,
      });

      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2000);

      router.push(`/posts/${post.id}`);
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: "投稿に失敗しました",
        type: "error",
        isLoading: false,
        autoClose: false,
        transition: Slide,
      });
    }
  };

  async function uploadImage(file: File, fileName: string, toastId: Id): Promise<string> {
    //webpの場合
    // 1. APIから署名付きURL取得
    const response = await fetchS3SignedUrl({
      fileName: fileName,
      contentType: file.type,
    });

    const url = typeof response === "string" ? response : response.url;

    if (url === "") {
      toast.update(toastId, {
        render: `画像をアップロード中... ${0}%`,
        progress: 0,
        type: "info",
        autoClose: false,
      });
      return fileName;
    }

    const uploadRes = await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.lengthComputable && progressEvent.total) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;

          // 進捗をトーストに反映
          toast.update(toastId, {
            render: `画像をアップロード中... ${progress.toFixed(2)}%`,
            progress: progress / 100, // 0から1に変換
            type: "info",
            autoClose: false,
          });
        }
      },
    });

    if (uploadRes.status !== 200) {
      throw new Error("S3 upload failed");
    }

    const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
    return `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN}/webp/${fileNameWithoutExtension}.webp`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.postFormContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          <RxCross2 size={24} />
        </button>
        <div className={styles.postContainer}>
          <div className={styles.postTitleContent}>
            <p className={styles.postTitle}>投稿編集</p>
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
                {errorTitle && <div className={styles.errorMessage}>{errorTitle}</div>}
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
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
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
                    <label key={option.value} className={styles.postDetailAgeLimitLabel}>
                      <input
                        type="checkbox"
                        name="ageRestriction"
                        className={styles.postDetailAgeLimitInput}
                        value={option.value}
                        checked={selectedAgeRestriction === option.value}
                        onChange={() => handleCheckboxChange(option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.postImageTypeContainer}>
                <p className={styles.postDetailTitleText}>投稿種別</p>
                <div className={styles.postImageTypeContent}>
                  {photoTypes.map((photoType) => (
                    <label key={photoType.id} className={styles.postImageTypeLabel}>
                      <input
                        type="checkbox"
                        name="ageRestriction"
                        className={styles.postImageTypeInput}
                        value={photoType.id}
                        checked={selectedPostTypes.includes(photoType.id)}
                        onChange={() => handlePostImageTypeChange(photoType.id)}
                      />
                      {photoType.name}
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
                    <div key={index} className={styles.postDetailMaterialFormContainer}>
                      <form className={styles.postDetailMaterialForm}>
                        <input
                          type="text"
                          value={boothItem.url}
                          onChange={(e) => handleBoothItemChange(e, index)}
                          className={styles.postDetailMaterialFormInput}
                          placeholder={`BoothのURLを貼って下さい`}
                        />
                        {errorBoothItems[index] && (
                          <div className={styles.errorMessage}>{errorBoothItems[index]}</div>
                        )}
                      </form>
                      <div className={styles.postDetailMaterialFormButtonContainer}>
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
                <p className={styles.postImageQuanityLimitText}>投稿画像 {images.length}/4</p>
              </div>

              <div className={styles.postImageContentContainer}>
                <div className={styles.postImageContentContent}>
                  {mainImage && (
                    <img
                      src={mainImage.file_data || URL.createObjectURL(mainImage.file)}
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
                      src={image.file_data || URL.createObjectURL(image.file)}
                      alt="Uploaded"
                      width={500}
                      height={500}
                      className={styles.postImage}
                    />
                    <button
                      className={styles.postImageClearButton}
                      onClick={() => handleImageRemove(index)}
                    >
                      x
                    </button>
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
            <button onClick={handleSubmit} disabled={images.length === 0}>
              <p className={styles.postButtonText}>更新する</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
