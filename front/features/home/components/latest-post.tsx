"use client";

import { Post } from "../types/post";
import Image from "next/image";
import { MdOutlinePhoto } from "react-icons/md";

export const LatestPost = ({
  latestPosts,
  isLiked,
  setIsLiked,
}: { latestPosts: Post[]; isLiked: boolean; setIsLiked: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <>
      <div className="max-w-full h-full bg-[#F5F5F5]">
        <div className="mx-6">
          <div className="max-w-full mx-auto pt-[40px]">
            <h2
              className="text-[#151C4B] font-medium text-center"
              style={{ fontWeight: "bold", fontSize: "40px", fontFamily: "Noto Sans JP" }}
            >
              新着
            </h2>
            <div className="flex justify-center mt-6 mb-6 space-x-4">
              {latestPosts.map((post) => (
                <div key={post.id} className="w-1/4 relative">
                  <Image
                    src="/home/new-post-image.png"
                    alt={`ピックアップ画像`}
                    width={402}
                    height={384}
                    className="w-full h-[384px] object-cover rounded-lg"
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
          </div>
        </div>
      </div>
    </>
  );
};
