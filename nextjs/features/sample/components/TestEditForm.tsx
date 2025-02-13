"use client";
import { useState } from "react";
import { Test } from "../types/test";
import { useRouter } from "next/navigation";
import { updateTest } from "../endpoint";
interface TestEditProps {
  test: Test;
}

export const TestEditForm = ({ test }: TestEditProps) => {
  const router = useRouter();
  const [name, setName] = useState<string>(test.name || "");
  const [content, setContent] = useState<string>(test.content || "");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateTest(test.id.toString(), name, content);
      router.push(`/sample/test/${test.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full mx-auto bg-white shadow-xl rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">更新画面</h2>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out text-black"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out text-black"
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
              更新する
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
