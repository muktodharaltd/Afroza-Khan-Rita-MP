"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

/*
  Video gallery:
  - thumbnails row (one horizontal row) with snap scrolling
  - mobile: each thumbnail large (snap-center)
  - desktop: smaller thumbnails with left/right controls
  - clicking thumbnail opens lightbox modal and plays the selected video
  - keyboard support: Esc close, ArrowLeft/Right navigate
  - thumbnail for each video uses poster image (faster than autoplay thumbnail)
  - hide scrollbar via global CSS for .hide-scrollbar
*/

const videos = [
  {
    id: 1,
    src: "/video1.mp4",
    poster: "/videos/poster-1.jpg",
    alt: "Afroza Khan Mita - Program Video 1",
  },
  {
    id: 2,
    src: "/video2.mp4",
    poster: "/videos/poster-2.jpg",
    alt: "Afroza Khan Mita - Program Video 2",
  },
  {
    id: 3,
    src: "/video3.mp4",
    poster: "/videos/poster-3.jpg",
    alt: "Afroza Khan Mita - Program Video 3",
  },
  {
    id: 4,
    src: "/video4.mp4",
    poster: "/videos/poster-4.jpg",
    alt: "Afroza Khan Mita - Program Video 4",
  },
  {
    id: 5,
    src: "/video1.mp4",
    poster: "/videos/poster-5.jpg",
    alt: "Afroza Khan Mita - Program Video 5",
  },
];

export default function VideoGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const rowRef = useRef(null);
  const videoRef = useRef(null); // modal video ref

  // keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % videos.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + videos.length) % videos.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // ensure thumbnail visible when index changes
  useEffect(() => {
    if (!rowRef.current) return;
    const thumbs = rowRef.current.querySelectorAll("[data-i]");
    const thumb = thumbs[index];
    if (thumb) {
      thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [index]);

  // when modal opens or index changes, play the modal video
  useEffect(() => {
    if (!open) return;
    const v = videoRef.current;
    if (!v) return;
    // try to play (autoplay might be blocked on some browsers; user can hit play)
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // autoplay was blocked — do nothing, user can click play
      });
    }
    // clean up: pause when modal closes
    return () => {
      if (v && !v.paused) {
        v.pause();
        v.currentTime = 0;
      }
    };
  }, [open, index]);

  function openAt(i) {
    setIndex(i);
    setOpen(true);
  }

  function next() {
    setIndex((i) => (i + 1) % videos.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + videos.length) % videos.length);
  }

  function scrollLeft() {
    if (!rowRef.current) return;
    const width = rowRef.current.offsetWidth;
    rowRef.current.scrollBy({ left: -width * 0.7, behavior: "smooth" });
  }
  function scrollRight() {
    if (!rowRef.current) return;
    const width = rowRef.current.offsetWidth;
    rowRef.current.scrollBy({ left: width * 0.7, behavior: "smooth" });
  }

  return (
    <section className="w-full bg-white py-8 px-4">
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="mb-6  items-center ">
          <h2 className="text-2xl font-semibold text-green-700">ভিডিও গ্যালারী</h2>
          <p className="text-sm text-green-600"> রিতার বিভিন্ন কার্যক্রমের ভিডিও</p>
        </div>

        <div className="relative">
          {/* left control (desktop) */}
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-200 rounded-full w-10 h-10 shadow-md hover:brightness-95"
          >
            ‹
          </button>

          {/* thumbnails row */}
          <div
            ref={rowRef}
            className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 md:py-4 hide-scrollbar"
          >
            {videos.map((v, i) => {
              // responsive sizes: mobile large snap-center; desktop fixed small thumb
              const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
              const thumbWidth = isMobile ? "85vw" : 300;
              const thumbHeight = isMobile ? "55vw" : 200;
              return (
                <button
                  key={v.id}
                  data-i={i}
                  onClick={() => openAt(i)}
                  className="flex-shrink-0 rounded-lg overflow-hidden relative focus:outline-none snap-center bg-gray-100"
                  aria-label={`Open video ${i + 1}`}
                  style={{ width: thumbWidth, height: thumbHeight }}
                >
                  {/* poster image */}
                  <Image src={v.poster} alt={v.alt} fill className="object-cover" />

                  {/* play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-black/60 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* caption overlay on hover (desktop) */}
                  <div className="absolute left-0 right-0 bottom-0 p-2 text-xs text-white bg-black bg-opacity-30 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-200">
                    {v.alt}
                  </div>
                </button>
              );
            })}
          </div>

          {/* right control (desktop) */}
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-200 rounded-full w-10 h-10 shadow-md hover:brightness-95"
          >
            ›
          </button>
        </div>

        {/* Lightbox modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setOpen(false)}
            />

            <div className="relative z-10 max-w-4xl w-full">
              <div className="bg-white rounded-md overflow-hidden shadow-lg">
                {/* video container */}
                <div className="relative w-full h-[60vh] md:h-[70vh] bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    key={videos[index].src + videos[index].poster} // force reload on index change
                    src={videos[index].src}
                    poster={videos[index].poster}
                    controls
                    controlsList="nodownload"
                    className="w-full h-full object-contain bg-black"
                  />
                </div>

                <div className="flex items-center justify-between p-3">
                  <div className="text-sm text-gray-700">{videos[index].alt}</div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:brightness-95"
                      aria-label="Previous video"
                    >
                      পূর্বের
                    </button>

                    <button
                      onClick={next}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:brightness-95"
                      aria-label="Next video"
                    >
                      পরের
                    </button>

                    <button
                      onClick={() => setOpen(false)}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                      aria-label="Close lightbox"
                    >
                      বন্ধ
                    </button>
                  </div>
                </div>
              </div>

              {/* thumbnails inside modal */}
              <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar">
                {videos.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setIndex(i)}
                    className={`relative rounded-md overflow-hidden flex-shrink-0 ${i === index ? "ring-2 ring-green-600" : ""}`}
                    style={{ width: 90, height: 60 }}
                  >
                    <Image src={v.poster} alt={v.alt} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
