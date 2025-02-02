"use client";

import Image from "next/image";
import { Notifications } from "../types/notification";

export const Main = ({ notifications }: { notifications: Notifications }) => {
  console.log(notifications);
  return (
    <div className="mx-6">
      <div className="max-w-[1680px] mx-auto">
        <div>
          <Image
            src="/top-image.png"
            alt="メイン画像"
            width={1680} 
            height={384}
            className="w-full h-96 object-cover"
          />
        </div>

        <div className="flex justify-center mt-6 mb-6 space-x-4">
          <div className="flex-1 rounded-md">
            <div className="flex space-x-4 mt-4 overflow-hidden">
              <div className="w-1/2">
                <Image
                  src="/top-image.png"
                  alt="画像2"
                  width={402} // 画像の幅を調整
                  height={64}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-1/2">
                <Image
                  src="/top-image.png"
                  alt="画像3"
                  width={402} // 画像の幅を調整
                  height={64}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-md">
            <div className="flex space-x-4 mt-4 overflow-hidden">
              <div className="w-1/2">
                <Image
                  src="/top-image.png"
                  alt="画像2"
                  width={402} // 画像の幅を調整
                  height={64}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-1/2">
                <Image
                  src="/top-image.png"
                  alt="画像3"
                  width={402} // 画像の幅を調整
                  height={64}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 初めての方はこちら */}

        <div className="flex justify-center mt-6 mb-6 space-x-4">
          <div className="flex-1 rounded-md">
            <div className="flex items-center">
              <p className="font-semibold text-lg">初めての方はこちら</p>
              <Image
                src="/shoshinsha-mark.png" // 初心者マークの画像パスを指定
                alt="初心者マーク"
                width={17}
                height={17}
                className="mr-2"
              />
            </div>
            <div className="flex space-x-4 mt-4 overflow-hidden">
              <div className="w-1/2">
                <Image
                  src="/top-image2.png"
                  alt="画像2"
                  width={402} // 画像の幅を調整
                  height={194}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-1/2">
                <Image
                  src="/top-image3.png"
                  alt="画像3"
                  width={402} // 画像の幅を調整
                  height={194}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="border-l border-[#D9D9D9] mx-4 self-stretch"></div>

          <div className="flex-1 rounded-md">
          <p className="font-semibold text-lg">お知らせ</p>
            <div className="flex space-x-4 mt-4 overflow-hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
