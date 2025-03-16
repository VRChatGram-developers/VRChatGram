/*
 * If this example does not work correctly in a sandbox,
 * you can download and run it locally
 */

"use client";

import "react-photo-album/rows.css";
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
    id: string;
    name: string;
    profile_url?: string;
  };
  postImageCount: number;
  handleLikeOrUnlike: () => void;
};

// import photos from "@/components/react-photo-albums.tsx/photos";
type SelectablePhoto = Photo & {
  postId: string;
  userId: string;
  postName: string;
  postImageUrl: string;
  postImageCount: number;
  show_sensitive_type: string;
  userName: string;
  isLiked: boolean;
  userImageUrl: string;
  handleLikeOrUnlike: () => void;
};

export const PhotoGallery = ({ posts }: { posts: PhotoGalleryProps[]}) => {

  const photoList = posts.map((post) => ({
    src: post.images.url,
    postId: post.postId,
    userId: post.user.id,
    postName: post.title,
    postImageUrl: post.images.url,
    width: post.images.width,
    height: post.images.height,
    postImageCount: post.postImageCount,
    userName: post.user.name,
    isLiked: post.is_liked,
    handleLikeOrUnlike: post.handleLikeOrUnlike,
    userImageUrl: post.user.profile_url,
    show_sensitive_type: post.show_sensitive_type,
  }));

  const [photoObjects] = useState<SelectablePhoto[]>(() =>
    photoList.map((photo) => ({
      ...photo,
      label: "Open image in a lightbox",
      show_sensitive_type: photo.show_sensitive_type,
      width: photo.width,
      height: photo.height,
      postId: String(photo.postId), // bigintをstringに変換
      userId: String(photo.userId), // bigintをstringに変換
      postName: photo.postName,
      postImageCount: photo.postImageCount,
      userName: photo.userName,
      isLiked: photo.isLiked,
      userImageUrl: photo.userImageUrl || "",
    }))
  );

  return (
    <RowsPhotoAlbum
      photos={photoObjects}
      targetRowHeight={350}
      rowConstraints={{ singleRowMaxHeight: 400, maxPhotos: 3, minPhotos: 1 }}
      render={{
        wrapper: (
          props,
          { photo: { postId, postName, postImageCount, userName, isLiked, userImageUrl, handleLikeOrUnlike } }
        ) => (
          <PhotoCard
            {...props}
            postId={postId}
            postName={postName}
            postImageCount={postImageCount}
            userName={userName}
            userImageUrl={userImageUrl}
            isLiked={isLiked}
            handleLikeOrUnlike={handleLikeOrUnlike}
          />
        ),
      }}
      defaultContainerWidth={1200}
      sizes={{
        size: "1200px",
        sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
      }}
      breakpoints={[220, 360, 480, 600, 900, 1200, 1500]}
    />
  );
};
