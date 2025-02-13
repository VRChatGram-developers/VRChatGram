"use client";
import React from "react";
import { Test, Tests } from "../types/test";
import Link from "next/link";

interface TestListProps {
  tests: Tests;
}

const BreadList: React.FC<TestListProps> = ({ tests }) => {
  return (
    <div className="min-h-screen flex justify-center items-start p-6">
      <div className="w-full max-w-6xl overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-8 py-4 text-left text-lg font-semibold border border-gray-300">
                ID
              </th>
              <th className="px-8 py-4 text-left text-lg font-semibold border border-gray-300">
                名前
              </th>
              <th className="px-8 py-4 text-left text-lg font-semibold border border-gray-300">
                内容
              </th>
              <th className="px-8 py-4 text-left text-lg font-semibold border border-gray-300">
                作成日
              </th>
              <th className="px-8 py-4 text-left text-lg font-semibold border border-gray-300">
                更新日
              </th>
              <th className="px-8 py-4 text-left text-lg font-semibold border border-gray-300">
                アクション
              </th>
            </tr>
          </thead>
          <tbody>
            {tests.tests.map((test: Test) => (
              <tr key={test.id} className="hover:bg-gray-50">
                <td className="px-8 py-6 border border-gray-300">
                  <Link
                    href={`/sample/test/${test.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline text-lg"
                  >
                    {test.id}
                  </Link>
                </td>
                <td className="px-8 py-6 text-lg border border-gray-300">{test.name}</td>
                <td className="px-8 py-6 text-lg border border-gray-300">{test.content}</td>
                <td className="px-8 py-6 text-lg border border-gray-300">
                  {test.createdAt}
                </td>
                <td className="px-8 py-6 text-lg border border-gray-300">
                  {test.updatedAt}
                </td>
                <td className="px-8 py-6 space-x-4 border border-gray-300">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => console.log("更新:", test.id)}
                  >
                    更新
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    onClick={() => console.log("削除:", test.id)}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BreadList;
