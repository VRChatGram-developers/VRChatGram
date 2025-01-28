"use client";
import React from "react";
import { Tests, Test } from "../types/test";
import Link from "next/link";

interface TestListProps {
  tests: Tests;
}

const BreadList: React.FC<TestListProps> = ({ tests }) => {
  console.log(tests);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tests.tests.map((test: Test) => (
          <div
            key={test.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
          >
            <Link href={`/sample/test/${test.id}`} className="text-indigo-600 hover:underline">
              {test.id}
            </Link>
            <div className="border-t border-b border-gray-200 py-2 mb-4">
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-bold text-gray-700">Coat:</span> {test.name}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-bold text-gray-700">Country:</span> {test.content}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                {test.createdAt}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {test.updatedAt}
              </p>
            </div>

            <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default BreadList;
