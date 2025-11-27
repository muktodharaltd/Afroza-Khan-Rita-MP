"use client";
import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  { id: 1, src: "/video1.mp4", title: "Video 1" },
  { id: 2, src: "/video2.mp4", title: "Video 2" },
  { id: 3, src: "/video3.mp4", title: "Video 3" },
  { id: 4, src: "/video4.mp4", title: "Video 4" },
  { id: 5, src: "/video3.mp4", title: "Video 5" },
  { id: 6, src: "/video4.mp4", title: "Video 6" },
];

export default function VideoGallery() {
  const [startIndex, setStartIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const carouselRef = useRef(null);

  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1; // mobile
      if (window.innerWidth < 1024) return 2; // tablet
    }
    return 4; // desktop
  };

  const visibleCount = getVisibleCount();
  const maxStartIndex = videos.length - visibleCount;

  const next = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxStartIndex));
  };

  const prev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  // Touch swipe handlers
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;
    if (distance > 50) next(); // swipe left
    if (distance < -50) prev(); // swipe right
  };

  return (
    <section className="py-12 max-w-7xl mx-auto relative">
      <h2 className="text-3xl font-bold mb-12 text-gray-800 text-center">
        Video Gallery
      </h2>

      {/* Carousel Controls */}
      <button
        onClick={prev}
        disabled={startIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 ${
          startIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        disabled={startIndex === maxStartIndex}
        className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 ${
          startIndex === maxStartIndex ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <ChevronRight size={24} />
      </button>

      <div
        className="overflow-hidden relative"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(startIndex * 100) / visibleCount}%)`,
          }}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              className={`flex-shrink-0 p-2 cursor-pointer`}
              style={{ width: `${100 / visibleCount}%` }}
              onClick={() => setActiveVideo(video)}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <video src={video.src} className="w-full h-56 object-cover" controls />
                <h3 className="text-lg font-semibold text-gray-700 text-center py-2">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for large video */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-700 text-xl font-bold"
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>
            <video
              src={activeVideo.src}
              controls
              autoPlay
              className="w-full h-[500px] object-contain bg-black"
            />
            <h3 className="text-lg font-semibold text-gray-700 text-center py-2">
              {activeVideo.title}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
}
