"use client";

import { PopularPost } from "../types/index";
import _ from "lodash";
import { PostCard } from "@/components/post-card";

export const PopularPostList = ({
  popularPostList,
  isLiked,
  setIsLiked,
}: {
  popularPostList: PopularPost[];
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const chunkPopularPostList = (postList: PopularPost[]) => {
    return _.chunk(postList, 4);
  };

  return (
    <>
      <div style={{ padding: "3rem 1.5rem" }}>
        <div className="w-full mx-auto">
          <h2
            className="text-[#151C4B] font-medium text-center"
            style={{ fontWeight: "bold", fontSize: "40px", fontFamily: "Noto Sans JP" }}
          >
            ピックアップ
          </h2>
          {chunkPopularPostList(popularPostList).map((chunckedPost, index) => (
            <div key={index} className="flex justify-center mt-6 mb-6 space-x-4">
              {chunckedPost.map((post) => (
                <PostCard
                  key={`${index}-${post.id}`}
                  postCardProps={{
                    postName: post.title,
                    postImageUrl: "/pickup-image.png",
                    postImageCount: post.images.length,
                    userName: post.user.name,
                    userImageUrl: "/posts/sample-user-icon.png",
                    isLiked: isLiked,
                    setIsLiked: setIsLiked,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
