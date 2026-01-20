
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

  /* ---------- Responsive visible count ---------- */
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

  /* ---------- Fetch videos ---------- */
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
  const next = () => setStartIndex((p) => Math.min(p + 1, maxStartIndex));
  const prev = () => setStartIndex((p) => Math.max(p - 1, 0));

  /* ---------- Touch swipe ---------- */
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => (touchStartX = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const d = touchStartX - touchEndX;
    if (d > 50) next();
    if (d < -50) prev();
  };

  /* ---------- Helper: get youtube embed URL ---------- */
  const getYoutubeEmbed = (video_id) =>
    `https://www.youtube.com/embed/${video_id}?rel=0&modestbranding=1`;

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
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-brandYellow text-white p-2 rounded-full z-10 ${
            startIndex === 0 ? "opacity-50" : "hover:bg-brandGreen"
          }`}
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          disabled={startIndex === maxStartIndex}
          className={`absolute right-0 top-1/2 -translate-y-1/2 bg-brandYellow text-white p-2 rounded-full z-10 ${
            startIndex === maxStartIndex ? "opacity-50" : "hover:bg-brandGreen"
          }`}
        >
          <ChevronRight />
        </button>

        {/* Carousel */}
        <div
          className="overflow-hidden"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${(startIndex * 100) / visibleCount}%)`,
            }}
          >
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 p-2"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div
                  className="group relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => setActiveVideo(video)}
                >
                  {/* ---------- Video Preview ---------- */}
                  {video.type === "Youtube" && video.video_id ? (
                    <iframe
                      src={getYoutubeEmbed(video.video_id)}
                      title={`Youtube video ${video.id}`}
                      className="w-full h-56 object-cover"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : video.video ? (
                    <video
                      src={video.video}
                      className="w-full h-56 object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                      ভিডিও পাওয়া যায়নি
                    </div>
                  )}

                  {/* Hover Description */}
                  {video.description && (
                    <div className="absolute top-0 left-0 w-full bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-end">
                      <p className="text-white text-sm p-3">{video.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative bg-black max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-white bg-brandYellow px-3 py-1 rounded-full z-50"
                onClick={() => setActiveVideo(null)}
              >
                ✕
              </button>

              <div className="relative">
                {activeVideo.type === "Youtube" && activeVideo.video_id ? (
                  <iframe
                    src={getYoutubeEmbed(activeVideo.video_id)}
                    title={`Youtube video ${activeVideo.id}`}
                    className="w-full h-[500px] object-contain"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : activeVideo.video ? (
                  <video
                    src={activeVideo.video}
                    controls
                    autoPlay
                    className="w-full h-[500px] object-contain bg-black"
                  />
                ) : (
                  <div className="w-full h-[500px] bg-gray-900 flex items-center justify-center text-white">
                    ভিডিও পাওয়া যায়নি
                  </div>
                )}

                {/* Description Overlay */}
                {activeVideo.description && (
                  <div className="absolute top-0 left-0 w-full bg-black/60 text-white p-4 text-xl">
                    {activeVideo.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
