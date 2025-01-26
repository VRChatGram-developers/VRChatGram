"use client";
import React from "react";
import { Bread, Breads } from "../types/bread";
import Link from "next/link";

interface BreadListProps {
  breads: Breads;
}

const BreadList: React.FC<BreadListProps> = ({ breads }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {breads.data.map((bread: Bread) => (
          <div
            key={bread.breed}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
          >
            <Link href={`/sample/bread/${bread.breed}`} className="text-indigo-600 hover:underline">
              {bread.breed}
            </Link>
            <div className="border-t border-b border-gray-200 py-2 mb-4">
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-bold text-gray-700">Coat:</span> {bread.coat}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-bold text-gray-700">Country:</span> {bread.country}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-bold text-gray-700">Origin:</span> {bread.origin}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-bold text-gray-700">Pattern:</span> {bread.pattern}
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
