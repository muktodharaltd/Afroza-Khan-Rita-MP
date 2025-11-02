"use client";
import React from "react";

export default function VideoGallery() {
  return (
    <section className="py-12 ">
      <h2 className="text-3xl font-bold mb-12 text-gray-800 text-center">
        Video Gallery
      </h2>

      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-30">
        {/* Left Column */}
        <div className="flex flex-col gap-20">
          {/* Video 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-100">
            <video src="/video1.mp4" controls className="w-full h-56 object-cover" />
            <div className="p-3">
              <h3 className="text-lg font-semibold text-gray-700 text-center">Video 1</h3>
            </div>
          </div>

          {/* Video 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-100">
            <video src="/video2.mp4" controls className="w-full h-56 object-cover" />
            <div className="p-3">
              <h3 className="text-lg font-semibold text-gray-700 text-center">Video 2</h3>
            </div>
          </div>
        </div>

        {/* Right Column with staggered top */}
        <div className="flex flex-col gap-20 mt-10 md:mt-20">
          {/* Video 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-100">
            <video src="/video3.mp4" controls className="w-full h-56 object-cover" />
            <div className="p-3">
              <h3 className="text-lg font-semibold text-gray-700 text-center">Video 3</h3>
            </div>
          </div>

          {/* Video 4 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-100">
            <video src="/video4.mp4" controls className="w-full h-56 object-cover" />
            <div className="p-3">
              <h3 className="text-lg font-semibold text-gray-700 text-center">Video 4</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
