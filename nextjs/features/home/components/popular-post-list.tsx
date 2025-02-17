"use client";

import { PopularPost } from "../types/index";
import _ from "lodash";
import { PostCard } from "@/components/post-card";
import styles from "../styles/popular-post-list.module.scss";

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
      <div className={styles.popularPostListContainer}>
        <p className={styles.popularPostListTitle}>ピックアップ</p>
        {chunkPopularPostList(popularPostList).map((chunckedPost, index) => (
          <div key={index} className={styles.popularPostList}>
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
    </>
  );
};
