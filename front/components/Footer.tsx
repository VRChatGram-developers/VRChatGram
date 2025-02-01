"use client";

export const Footer = () => {
  return (
    <footer className="w-full h-[270px] bg-[#151C4B] relative">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="text-white text-[32px] font-bold mb-6">VGRAM</div>
        <div className="flex gap-8 text-white text-sm">
          <a href="/terms" className="hover:underline">
            利用規約
          </a>
          <a href="/privacy" className="hover:underline">
            プライバシーポリシー
          </a>
          <a href="/faq" className="hover:underline">
            Q&A
          </a>
        </div>
        <div className="text-white text-sm mt-6">
          サービスに関するお問い合わせはsample@gmail.comまで
        </div>
        <div className="text-white text-sm mt-4 mb-6">© vgram.app All rights reserved.</div>
      </div>
    </footer>
  );
};
