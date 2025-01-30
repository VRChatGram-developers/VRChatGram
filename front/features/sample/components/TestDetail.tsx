"use client";

import { useState, useEffect } from "react";
import { Test } from "../types/test";
import { useRouter } from "next/navigation";
import { deleteTest } from "../endpoint";
interface TestDetailProps {
  test: Test;
}

export const TestDetail = ({ test }: TestDetailProps) => {
  const router = useRouter();
  const [testData, setTestData] = useState<Test>(test);
  useEffect(() => {
    setTestData(test);
  }, [test]);

  if (!testData) {    
    return <div>読み込み中...</div>;
  }

  const toEditPage = () => {
    router.push(`/sample/test/${test.id}/edit`);
  }

  const handleDelete = async () => {
    const isConfirmed = window.confirm("本当に削除してもよろしいですか？");
    if (isConfirmed) {
      try {
        await deleteTest(test.id.toString());
        router.push("/sample/test");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">詳細画面</h1>
            <p className="text-sm text-gray-500">ID: {testData.id}</p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">名前</h2>
              <p className="text-gray-600">{testData.name}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">内容</h2>
              <p className="text-gray-600">{testData.content}</p>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">作成日: {testData.createdAt}</p>
                  <p className="text-sm text-gray-500">更新日: {testData.updatedAt}</p>
                </div>
                <div className="space-x-3">
                  <button onClick={toEditPage} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                    更新
                  </button>
                  <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200">
                    削除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
