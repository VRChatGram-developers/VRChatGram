"use client";

export const AccountDeleteModal = ({ onClose }: { onClose: () => void }) => {
  const handleDeleteAccount = async () => {
    console.log("アカウントを削除する");
    onClose();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <h1>アカウント削除</h1>
      <p>削除すると、以下の情報がすべて失われます。</p>
      <ul>
        <li>・プロフィール情報</li>
        <li>・写真データ</li>
        <li>・お気に入り</li>
        <li>・フォロー/フォロワー</li>
      </ul>
      <button onClick={handleDeleteAccount}>アカウントを削除</button>
    </div>
  );
};
