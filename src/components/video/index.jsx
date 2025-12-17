

"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL;

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const carouselRef = useRef(null);

  /* ---------- Responsive visible count (UNCHANGED) ---------- */
  const updateVisibleCount = () => {
    if (window.innerWidth < 640) setVisibleCount(2);
    else if (window.innerWidth < 1024) setVisibleCount(3);
    else setVisibleCount(4);
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  /* ---------- Fetch videos from backend ---------- */
  useEffect(() => {
    if (!API_BASE) return;

    const fetchVideos = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/video-galleries`);
        const result = await res.json();
        setVideos(result.data || []);
      } catch (err) {
        console.error("Video gallery load failed", err);
        setVideos([]);
      }
    };

    fetchVideos();
  }, []);

  const maxStartIndex = Math.max(videos.length - visibleCount, 0);

  const next = () =>
    setStartIndex((prev) => Math.min(prev + 1, maxStartIndex));
  const prev = () => setStartIndex((prev) => Math.max(prev - 1, 0));

  /* ---------- Touch swipe (UNCHANGED) ---------- */
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
    if (distance > 50) next();
    if (distance < -50) prev();
  };

  return (
    <div className="shadow-sm">
      <section className="py-12 max-w-7xl mx-auto relative">
        <h2 className="text-3xl font-bold mb-6 ml-5 text-brandGreen">
          ভিডিও গ্যালারি
        </h2>

        {/* Controls */}
        <button
          onClick={prev}
          disabled={startIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-brandYellow text-white p-2 rounded-full shadow-md z-10 transition hover:bg-brandGreen ${
            startIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={next}
          disabled={startIndex === maxStartIndex}
          className={`absolute right-0 top-1/2 -translate-y-1/2 bg-brandYellow text-white p-2 rounded-full shadow-md z-10 transition hover:bg-brandGreen ${
            startIndex === maxStartIndex ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel */}
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
                className="flex-shrink-0 p-2 cursor-pointer"
                style={{ width: `${100 / visibleCount}%` }}
                onClick={() => setActiveVideo(video)}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-brandGray">
                  <video
                    src={video.video}   // 🔥 backend video
                    className="w-full h-56 object-cover"
                    controls
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 bg-brandGray bg-opacity-60 flex items-center justify-center z-50"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="bg-white rounded-lg overflow-hidden max-w-3xl w-full relative border border-brandGreen"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-white bg-brandYellow px-3 py-1 rounded-full z-50 cursor-pointer shadow-md hover:bg-brandGreen transition"
                onClick={() => setActiveVideo(null)}
              >
                ✕
              </button>

              <video
                src={activeVideo.video}
                controls
                autoPlay
                className="w-full h-[500px] object-contain bg-brandGray"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
