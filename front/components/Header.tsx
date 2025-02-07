"use client";

import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaCamera } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";

export const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session);
  console.log(`status`);
  console.log(status);

  return (
    <header className="fixed top-0 w-full h-[50px] bg-white shadow-md flex items-center px-4 z-10">
      <Image
        src="/logo.png"
        alt="Logo"
        width={118}
        height={32}
        className="ml-[25px]"
        onClick={() => router.push("/")}
      />
      <div className="flex-1 mx-[165px] relative">
        <div className="relative">
          <input
            type="text"
            placeholder="何かお探しですか？"
            className="w-full max-w-[970px] h-[32px] px-4 pl-10 border border-gray-300 rounded-md placeholder-[#5D5D5D]"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5D5D5D]" />
        </div>
      </div>
      <div className="flex-shrink-0 flex gap-5 relative items-center justify-center">
        {status == "loading" ? (
          <></>
        ) : status !== "authenticated" ? (
          <>
            <button
              onClick={() => router.push("/sign-in")}
              className="w-[118px] h-[32px] bg-white border border-[#69BEEF] text-[#69BEEF] text-[12px] font-bold leading-[15px] tracking-[0.21666669845581055px] text-center rounded-[16px] flex items-center justify-center"
            >
              ログイン
            </button>
            <button
              onClick={() => router.push("/sign-up")}
              className="w-[118px] h-[32px] bg-[#69BEEF] text-white text-[12px] font-bold leading-[15px] tracking-[0.21666669845581055px] text-center rounded-[16px] flex items-center justify-center"
            >
              新規登録
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push("/sign-in")}
              className="absolute right-44 w-[118px] h-[32px] bg-[#69BEEF] border border-[#69BEEF] text-white text-[12px] font-bold leading-[15px] tracking-[0.21666669845581055px] text-center rounded-[16px] flex items-center justify-center"
            >
              写真を投稿
              <FaCamera className="ml-2" style={{ width: "20px", height: "18px" }} />
            </button>
            <Image
              src="/header/user-sample-icon.png"
              alt="User Icon"
              width={40}
              height={40}
              className="relative right-[60%]"
            />
            <RiArrowDownSLine
              className="relative right-[80%]"
              style={{ width: "30px", height: "24px" }}
            />
          </>
        )}
      </div>
    </header>
  );
};
