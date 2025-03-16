/*
 * If this example does not work correctly in a sandbox,
 * you can download and run it locally
 */

"use client";

import "react-photo-album/rows.css";
import { Post } from "@/features/posts/types";
import { useState } from "react";
import { Photo, RowsPhotoAlbum } from "react-photo-album";
import { PhotoCard } from "./photo-cards/photo-card";

export type PhotoGalleryProps = {
  postId: bigint | string;
  title: string;
  show_sensitive_type: string;
  images: {
    id: bigint;
    url: string;
    width: number;
    height: number;
  };
  is_liked: boolean;
  user: {
    id: bigint;
    name: string;
  };
  postImageCount: number;
};

// import photos from "@/components/react-photo-albums.tsx/photos";
type SelectablePhoto = Photo & {
  postId: string;
  userId: string;
  postName: string;
  postImageUrl: string;
  postImageCount: number;
  userName: string;
  isLiked: boolean;
  handleLikeOrUnlike: () => void;
};

export const PhotoGallery = ({ posts }: { posts: PhotoGalleryProps[] }) => {
  const handleLikeOrUnlike = () => {};

  console.log(`posts`);
  console.log(posts);
  console.log(`posts`);
  const photoList = posts.map((post) => ({
    src: post.images.url,
    alt: "test",
    postId: post.postId,
    userId: post.user.id,
    postName: post.title,
    postImageUrl: post.images.url,
    width: post.images.width,
    height: post.images.height,
    postImageCount: post.postImageCount,
    userName: post.user.name,
    isLiked: post.is_liked,
    handleLikeOrUnlike: handleLikeOrUnlike,
  }));

  const [photoObjects] = useState<SelectablePhoto[]>(() =>
    photoList.map((photo) => ({
      ...photo,
      label: "Open image in a lightbox",
      width: photo.width,
      height: photo.height,
      postId: photo.postId.toString(), // bigintをstringに変換
      userId: photo.userId.toString(), // bigintをstringに変換
      postTitle: photo.postName,
      postImageUrl: photo.postImageUrl,
      postImageCount: photo.postImageCount,
      userName: photo.userName,
      isLiked: photo.isLiked,
      handleLikeOrUnlike: photo.handleLikeOrUnlike,
    }))
  );

  return (
    <RowsPhotoAlbum
      photos={photoObjects}
      targetRowHeight={350}
      rowConstraints={{ singleRowMaxHeight: 350, maxPhotos: 3,  }}
      render={{
        wrapper: (
          props,
          { photo: { postId, postName, postImageUrl, postImageCount, userName, isLiked } }
        ) => (
          <PhotoCard
            {...props}
            postId={postId}
            postName={postName}
            postImageUrl={postImageUrl}
            postImageCount={postImageCount}
            userName={userName}
            isLiked={isLiked}
            handleLikeOrUnlike={handleLikeOrUnlike}
          />
        ),
      }}
      defaultContainerWidth={1500}
      sizes={{
        size: "1200px",
        sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
      }}
    />
  );
};
