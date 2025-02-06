"use client";
import Image from "next/image";
import { Tag } from "../types/tag";

export const PopularTag = ({ popularTagList }: { popularTagList: Tag[] }) => {
  return (
    <>
      <div className="max-w-full h-full">
        <div className="mx-6 mb-[40px]">
          <div className="max-w-full mx-auto pt-[40px] ">
            <h2
              className="text-[#151C4B] text-center"
              style={{ fontSize: "40px", fontFamily: "Noto Sans JP", fontWeight: "bold" }}
            >
              作品を検索する
            </h2>
          </div>
          <div className="flex justify-center mt-6 mb-6 space-x-4">
            <div className="flex-1 rounded-md">
              <div className="flex space-x-4 mt-4 overflow-hidden">
                <div className="w-1/2">
                  {/*背景を#FFC596の枠を作成して  */}
                  <div
                    className="w-full h-[320px] bg-[#FFC596] relative"
                    style={{ borderRadius: "16px" }}
                  >
                    <p
                      className="text-[#FFFFFF] absolute"
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
                      height={320}
                      className="absolute"
                      style={{ top: "0px", left: "340px" }}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div
                    className="w-full h-[320px] bg-[#151C4B] relative"
                    style={{ borderRadius: "16px" }}
                  >
                    <p>ワールドー写真</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 rounded-md">
            <div className="flex space-x-4 mt-4 overflow-hidden">
              {popularTagList.map((tag) => (
                <>
                  <div className="w-1/6" key={tag.id}>
                    <div className="flex space-x-4 mt-4 overflow-hidden relative">
                      <Image
                        src="/home/femailtag-icon.png"
                        alt={`#${tag.name}`}
                        width={260}
                        height={260}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-[#00000033] rounded-lg">
                        <p
                          className="absolute top-1/2 transform -translate-y-1/2"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Noto Sans JP",
                            fontWeight: "bold",
                            left: "16px",
                            color: "#FFFFFF",
                          }}
                        >
                          #{tag.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="flex-1 rounded-md"></div>
        </div>
        {/* TODO: この下を */}
      </div>
    </>
  );
};
