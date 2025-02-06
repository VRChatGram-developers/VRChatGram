"use client";

import { Post } from "../types/post";
import { MdOutlinePhoto } from "react-icons/md";
import Image from "next/image";
import _ from "lodash";

export const PopularPost = ({
  popularPostList,
  isLiked,
  setIsLiked,
}: {
  popularPostList: Post[];
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const chunkPopularPostList = (postList: Post[]) => {
    return _.chunk(postList, 4);
  };

  return (
    <>
      <div className="mx-6">
        <div className="w-full mx-auto pt-[40px] bg-[#F5F5F5] pb-[40px]">
          <h2
            className="text-[#151C4B] font-medium text-center"
            style={{ fontWeight: "bold", fontSize: "40px", fontFamily: "Noto Sans JP" }}
          >
            ピックアップ
          </h2>
          {chunkPopularPostList(popularPostList).map((chunckedPost, index) => (
            <div key={index} className="flex justify-center mt-6 mb-6 space-x-4">
              {chunckedPost.map((post) => (
                <div key={`${index}-${post}`} className="w-1/4 relative">
                  <Image
                    src="/pickup-image.png"
                    alt={`ピックアップ画像 ${post}-${index}`}
                    width={402}
                    height={384}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    className="absolute top-4 right-4 w-[64px] h-[32px] bg-[#00000033] flex items-center justify-center"
                    style={{ borderRadius: "40px" }}
                  >
                    <MdOutlinePhoto
                      className="text-white text-2xl"
                      style={{ width: "18px", height: "18px" }}
                    />
                    <p
                      className="text-white"
                      style={{
                        marginLeft: "15px",
                        fontSize: "14px",
                        fontFamily: "Noto Sans JP",
                        fontWeight: "bold",
                      }}
                    >
                      {post.images.length ?? 0}
                    </p>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        cursor: "pointer",
                      }}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      {isLiked ? (
                        <Image src="/heart.png" alt="heart" width={64} height={64} />
                      ) : (
                        <Image src="/heart-outline.png" alt="heart" width={64} height={64} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
