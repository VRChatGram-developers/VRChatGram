"use client";

import { LatestPost as LatestPostType } from "../types/index";
import { PostCard } from "@/components/post-card";

export const LatestPost = ({
  latestPosts,
  isLiked,
  setIsLiked,
}: {
  latestPosts: LatestPostType[];
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="max-w-full h-full" style={{ padding: "3rem 1.5rem" }}>
        <div>
          <div className="max-w-full mx-auto">
            <h2
              className="text-[#151C4B] font-medium text-center"
              style={{ fontWeight: "bold", fontSize: "40px", fontFamily: "Noto Sans JP" }}
            >
              新着
            </h2>
            <div className="flex justify-center mt-6 mb-6 space-x-4">
              {latestPosts.map((post) => (
                <PostCard
                  key={post.id}
                  postCardProps={{
                    postName: post.title,
                    postImageUrl: "/home/new-post-image.png",
                    postImageCount: post.images.length,
                    userName: post.user.name,
                    userImageUrl: "/posts/sample-user-icon.png",
                    isLiked: isLiked,
                    setIsLiked: setIsLiked,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
