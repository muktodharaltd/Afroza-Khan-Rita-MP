"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Horizontal single-row gallery that stays in one row on desktop and mobile
// - Desktop: a single horizontal row of images (thumbnails) you can scroll horizontally
// - Mobile: each image uses large width (snap to center) and can be swiped
// - Lightbox modal remains for viewing full image with prev/next
// - Scrollbar hidden on all platforms

const photos = [
  { id: 1, src: "/one.jpg", alt: "Afroza Khan Mita - Program 1" },
  { id: 2, src: "/two.jpg", alt: "Afroza Khan Mita - Program 2" },
  { id: 3, src: "/three.jpg", alt: "Afroza Khan Mita - Program 3" },
  { id: 4, src: "/four.jpg", alt: "Afroza Khan Mita - Program 4" },
  { id: 5, src: "/five.jpg", alt: "Afroza Khan Mita - Program 5" },
  { id: 6, src: "/six.jpg", alt: "Afroza Khan Mita - Program 6" },
  // add more images as needed
];

export default function PhotoGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const rowRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + photos.length) % photos.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    // when index changes in lightbox, ensure thumbnail is visible in row
    if (!rowRef.current) return;
    const thumb = rowRef.current.querySelectorAll("button[data-i]")[index];
    if (thumb) {
      thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [index]);

  function openAt(i) {
    setIndex(i);
    setOpen(true);
  }

  function next() {
    setIndex((i) => (i + 1) % photos.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + photos.length) % photos.length);
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
      {/* global CSS to hide scrollbar across browsers for the .hide-scrollbar class */}
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
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-green-700">ফটো গ্যালারী</h2>
          <p className="text-sm text-green-600">মিতার বিভিন্ন কার্যক্রমের মুহূর্তসমূহ</p>
        </div>

        {/* Controls for desktop */}
        <div className="relative">
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-200 rounded-full w-10 h-10 shadow-md hover:brightness-95"
          >
            ‹
          </button>

          <div
            ref={rowRef}
            className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 md:py-4 hide-scrollbar"
            // show one row only; items will be horizontally scrollable
          >
            {photos.map((p, i) => (
              <button
                key={p.id}
                data-i={i}
                onClick={() => openAt(i)}
                className={`flex-shrink-0 rounded-lg overflow-hidden relative focus:outline-none snap-center`}
                style={{
                  width: (typeof window !== "undefined" && window.innerWidth < 768) ? "85vw" : 300,
                  height: (typeof window !== "undefined" && window.innerWidth < 768) ? "55vw" : 200,
                }}
                aria-label={`Open photo ${i + 1}`}>

                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 85vw, 300px"
                  className="object-cover w-full h-full"
                  priority={i < 3}
                />

                {/* caption overlay on hover for desktop */}
                <div className="absolute left-0 right-0 bottom-0 p-2 text-xs text-white bg-black bg-opacity-30 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-200">
                  {p.alt}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-200 rounded-full w-10 h-10 shadow-md hover:brightness-95"
          >
            ›
          </button>
        </div>

        {/* Lightbox Modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setOpen(false)}
            />

            <div className="relative z-10 max-w-4xl w-full">
              <div className="bg-white rounded-md overflow-hidden shadow-lg">
                <div className="relative w-full h-[60vh] md:h-[70vh] bg-black">
                  <Image
                    src={photos[index].src}
                    alt={photos[index].alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="flex items-center justify-between p-3">
                  <div className="text-sm text-gray-700">{photos[index].alt}</div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:brightness-95"
                      aria-label="Previous photo"
                    >
                      পূর্বে
                    </button>

                    <button
                      onClick={next}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:brightness-95"
                      aria-label="Next photo"
                    >
                      পরবর্তী
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

              {/* thumbnails row (optional) */}
              <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar">
                {photos.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setIndex(i)}
                    className={`relative rounded-md overflow-hidden flex-shrink-0 ${i === index ? 'ring-2 ring-green-600' : ''}`}
                    style={{ width: 90, height: 60 }}
                  >
                    <Image src={p.src} alt={p.alt} fill className="object-cover" />
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
