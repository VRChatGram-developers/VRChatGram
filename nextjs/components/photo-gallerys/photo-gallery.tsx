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
  isLiked: boolean;
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
  const photoObjects = posts.map((post) => ({
    src: post.images.url,
    width: post.images.width,
    height: post.images.height,
    postId: post.postId,
    myId: post.user.my_id,
    postName: post.title,
    postImageCount: post.postImageCount,
    userName: post.user.name,
    isLiked: post.isLiked,
    userImageUrl: post.user.profile_url ?? "",
    handleLikeOrUnlike: post.handleLikeOrUnlike,
    show_sensitive_type: post.show_sensitive_type,
  }));

  return (
    <RowsPhotoAlbum
      photos={photoObjects}
      targetRowHeight={300}
      render={{
        wrapper: (props, { photo }) => <PhotoCard {...props} {...photo} />,
      }}
      skeleton={<div style={{ width: "100%", minHeight: 300 }} />}
      defaultContainerWidth={300}
      // sizes={{
      //   size: "1168px",
      //   sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
      // }}
      breakpoints={[400, 600, 900, 1200, 1500, 1700]}
      rowConstraints={{ singleRowMaxHeight: 300, maxPhotos: 5, minPhotos: 1 }}
    />
  );
};
