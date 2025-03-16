/*
 * If this example does not work correctly in a sandbox,
 * you can download and run it locally
 */

"use client";

import "react-photo-album/rows.css";
import { Image as ImageType, Post } from "@/features/posts/types";
import { SelectIcon } from "@/components/react-photo-albums.tsx/SelectIcon";
import { useState } from "react";
import { Photo, RowsPhotoAlbum } from "react-photo-album";

// import photos from "@/components/react-photo-albums.tsx/photos";
type SelectablePhoto = Photo & {
  selected?: boolean;
};

export default function PhotoGallery({ posts }: { posts: Post[] }) {
  const photoList = posts.map((post) => ({
    src: post.images[0].url,
    alt: "test",
    width: post.images[0].width,
    height: post.images[0].height,
  }));

  const [photoObjects, setPhotoObjects] = useState<SelectablePhoto[]>(() =>
    photoList.map((photo) => ({
      ...photo,
      href: photo.src,
      label: "Open image in a lightbox",
    }))
  );

  const [lightboxPhoto, setLightboxPhoto] = useState<SelectablePhoto>();

  console.log(photoList);

  return (
    <RowsPhotoAlbum
      photos={photoObjects}
      render={{
        // render custom styled link
        // render image selection icon
        extras: (_, { photo: { selected }, index }) => (
          <SelectIcon
            selected={selected}
            onClick={(event) => {
              setPhotoObjects((prevPhotos) => {
                const newPhotos = [...prevPhotos];
                newPhotos[index].selected = !selected;
                return newPhotos;
              });

              // prevent the event from propagating to the parent link element
              event.preventDefault();
              event.stopPropagation();
            }}
          />
        ),
      }}
      defaultContainerWidth={1200}
      sizes={{
        size: "1168px",
        sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
      }}
    />
  );
}
