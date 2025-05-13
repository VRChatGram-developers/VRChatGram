"use client";
import Image from "next/image";
import { Tag } from "../types/index";
import styles from "../styles/popular-tag.module.scss";
import { useSearchStore } from "@/libs/store/search-store";
import { useRouter } from "next/navigation";
import { createQueryParams } from "@/utils/queryParams";

export const PopularTag = ({ popularTagList }: { popularTagList: Tag[] }) => {
  const router = useRouter();
  const { setSearchQuery } = useSearchStore();

  const handleToPostSearchList = () => {
    router.push(`/posts?${new URLSearchParams({ tag: "", page: "1" })}`);
  };

  const redirectToPostSearchListByTagName = (tagName: string) => {
    setSearchQuery(`#${tagName}`);
    router.push(`/posts?${createQueryParams({ tag: tagName, page: 1 })}`);
  };

  return (
    <div className={styles.popularTagContainer}>
      <div className={styles.popularTagTitleWrapper}>
        <h2 className={styles.popularTagTitle}>作品を検索する</h2>
      </div>
      <div className={styles.searchTagAdnButtonContainer}>
        <div className={styles.searchButtonContainer}>
          <div className={styles.avatarSearchButtonContent}>
            <div className={styles.avatarSearchTextContainer}>
              <p className={styles.avatarSearchTitle}>アバター写真</p>
              <button className={styles.avatarSearchText} onClick={handleToPostSearchList}>
                探す <span>›</span>
              </button>
            </div>
          </div>
          <div className={styles.shortMoiveSearchButtonContent}>
            <div className={styles.comingSoonText}>Coming Soon ...</div>
            <div className={styles.shortMoiveSearchTextContainer}>
              <p className={styles.shortMoiveSearchTitle}>ショート動画</p>
              <button className={styles.shortMoiveSearchText}>
                探す <span>›</span>
              </button>
            </div>
          </div>

          {/* <div className="w-1/2">
            <div className="absolute inset-0 bg-black opacity-60 rounded-lg z-10"></div>
            <p
              className="text-white absolute text-4xl font-bold font-NotoSansJP"
              style={{
                top: "76px",
                right: "100px",
                fontSize: "40px",
                fontFamily: "Noto Sans JP",
                fontWeight: "bold",
                width: "260px",
              }}
            >
              ワールド写真
            </p>
            <div
              className="absolute bg-[#FFFFFF]"
              style={{
                top: "172px",
                right: "100px",
                width: "260px",
                borderRadius: "16px",
              }}
            >
              <p
                className="text-[#151C4B] text-center"
                style={{
                  fontSize: "40px",
                  fontFamily: "Noto Sans JP",
                  fontWeight: "bold",
                }}
              >
                探す
              </p>
            </div>
            <div className="absolute right-[70%] translate-x-1/2 w-64 h-64 rounded-full overflow-hidden">
              <Image
                src="/home/world-search-icon.png"
                alt="search"
                fill
                className="object-cover"
              />
            </div>
            <p
              className="text-white font-bold absolute z-40"
              style={{ fontSize: "64px" }}
            >
              Coming soon
            </p>
          </div> */}
        </div>
      </div>
      <div className={styles.tagListContainer}>
        {popularTagList.map((tag) => (
          <div className={styles.tagListContent} key={tag.id}>
            <Image
              src={tag.url || "/home/femailtag-icon.png"}
              alt={`#${tag.name}`}
              fill
              className={styles.tagImage}
            />
            <div
              className={styles.tagListTextContainer}
              onClick={() => redirectToPostSearchListByTagName(tag.name)}
            >
              <p className={styles.tagListText}>#{tag.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
