/*
 * If this example does not work correctly in a sandbox,
 * you can download and run it locally
 */

"use client";

import "react-photo-album/rows.css";
import { RowsPhotoAlbum } from "react-photo-album";
import { PhotoCard } from "./photo-cards/photo-card";

export type PhotoGalleryProps = {
  postId: string;
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
    my_id: string;
    name: string;
    profile_url?: string;
  };
  postImageCount: number;
  handleLikeOrUnlike: () => void;
};

export const PhotoGallery = ({ posts }: { posts: PhotoGalleryProps[] }) => {
  const photoList = posts.map((post) => ({
    src: post.images.url,
    postId: post.postId,
    myId: post.user.my_id,
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

  const photoObjects = photoList.map((photo) => ({
    ...photo,
    label: "Open image in a lightbox",
    show_sensitive_type: photo.show_sensitive_type,
    width: photo.width,
    height: photo.height,
    postId: photo.postId,
    myId: photo.myId,
    postName: photo.postName,
    postImageCount: photo.postImageCount,
    userName: photo.userName,
    isLiked: photo.isLiked,
    userImageUrl: photo?.userImageUrl || "",
    handleLikeOrUnlike: photo.handleLikeOrUnlike,
  }));

  return (
    <RowsPhotoAlbum
      photos={photoObjects}
      targetRowHeight={200}
      render={{
        wrapper: (
          props,
          {
            photo: {
              postId,
              postName,
              postImageCount,
              userName,
              isLiked,
              userImageUrl,
              handleLikeOrUnlike,
              myId,
            },
          }
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
            myId={myId}
          />
        ),
      }}
      sizes={{
        size: "1200px",
        sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 70px)" }],
      }}
      breakpoints={[220, 360, 480, 600, 900, 1200, 1500, 1700]}
      rowConstraints={{ singleRowMaxHeight: 150, maxPhotos: 4, minPhotos: 1 }}
    />
  );
};
