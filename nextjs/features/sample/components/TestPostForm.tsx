"use client";

import { useState } from "react";
import { postTest } from "../endpoint";

export const TestPostForm = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("送信データ:", { name, content });
    try {
      await postTest(name, content);
    } catch (error) {
      console.error("テスト投稿失敗", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full mx-auto bg-white shadow-xl rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">新規投稿</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
              名前
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out"
              required
              placeholder="あなたの名前を入力してください"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-semibold text-gray-700 mb-2 ml-1"
            >
              内容
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out"
              rows={4}
              required
              placeholder="投稿内容を入力してください"
            />
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transform hover:scale-[1.02] transition-all duration-200 font-medium"
            >
              投稿する
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
