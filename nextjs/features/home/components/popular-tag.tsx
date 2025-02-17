"use client";
import Image from "next/image";
import { Tag } from "../types/tag";
import styles from "../styles/popular-tag.module.scss";

export const PopularTag = ({ popularTagList }: { popularTagList: Tag[] }) => {
  return (
    <>
      <div className={styles.popularTagContainer}>
        <div className={styles.popularTagTitleWrapper}>
          <h2 className={styles.popularTagTitle}>
            作品を検索する
          </h2>
        </div>
        <div className="flex justify-center mt-6 mb-6 space-x-4">
          <div className="flex-1 rounded-md overflow-hidden">
            <div className="flex space-x-4 mt-4 overflow-hidden">
              <div className="w-1/2">
                {/* 背景を#FFC596の枠を作成 */}
                <div className="w-full h-80 bg-[#FFC596] relative rounded-lg flex items-center justify-center relative">
                  <p
                    className="text-white absolute text-4xl font-bold font-NotoSansJP"
                    style={{
                      top: "76px",
                      left: "100px",
                      fontSize: "40px",
                      fontFamily: "Noto Sans JP",
                      fontWeight: "bold",
                      width: "260px",
                    }}
                  >
                    アバター写真
                  </p>
                  <div
                    className="absolute bg-[#FFFFFF]"
                    style={{ top: "172px", left: "100px", width: "260px", borderRadius: "16px" }}
                  >
                    <p
                      className="text-[#FFC596] text-center"
                      style={{
                        fontSize: "40px",
                        fontFamily: "Noto Sans JP",
                        fontWeight: "bold",
                      }}
                    >
                      探す
                    </p>
                  </div>
                  <Image
                    src="/home/avater-search-icon.png"
                    alt="search"
                    width={300}
                    height={450}
                    className="object-contain max-w-full max-h-full absolute"
                    style={{ top: "6%", left: "50%" }}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="w-full h-80 bg-[#151C4B] relative rounded-lg flex items-center justify-center relative">
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
                    style={{ top: "172px", right: "100px", width: "260px", borderRadius: "16px" }}
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
                  <p className="text-white font-bold absolute z-40" style={{ fontSize: "64px" }}>
                    Coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-md">
          <div className="flex space-x-4 mt-4 overflow-hidden">
            {popularTagList.map((tag) => (
              <div className="w-1/6" key={tag.id}>
                <div className="flex space-x-4 mt-4 overflow-hidden relative">
                  <Image
                    src="/home/femailtag-icon.png"
                    alt={`#${tag.name}`}
                    width={260}
                    height={260}
                    className="object-cover rounded-lg w-full h-auto max-h-90"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-[#00000033] rounded-lg flex items-center justify-start p-4">
                    <p
                      className="text-white text-lg font-bold"
                      style={{
                        fontSize: "20px",
                        fontFamily: "Noto Sans JP",
                        left: "16px",
                      }}
                    >
                      #{tag.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 rounded-md"></div>
      </div>
    </>
  );
};
