// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const videos = [
//   { id: 1, src: "/video1.mp4", title: "Video 1" },
//   { id: 2, src: "/video2.mp4", title: "Video 2" },
//   { id: 3, src: "/video3.mp4", title: "Video 3" },
//   { id: 4, src: "/video4.mp4", title: "Video 4" },
//   { id: 5, src: "/video3.mp4", title: "Video 5" },
//   { id: 6, src: "/video4.mp4", title: "Video 6" },
// ];

// export default function VideoGallery() {
//   const [startIndex, setStartIndex] = useState(0);
//   const [activeVideo, setActiveVideo] = useState(null);
//   const [visibleCount, setVisibleCount] = useState(4);
//   const carouselRef = useRef(null);

//   // Update visible count based on screen width
//   const updateVisibleCount = () => {
//     if (window.innerWidth < 640) setVisibleCount(2); // mobile → 2 videos
//     else if (window.innerWidth < 1024) setVisibleCount(3); // tablet → 3 videos
//     else setVisibleCount(4); // desktop → 4 videos
//   };

//   useEffect(() => {
//     updateVisibleCount();
//     window.addEventListener("resize", updateVisibleCount);
//     return () => window.removeEventListener("resize", updateVisibleCount);
//   }, []);

//   const maxStartIndex = videos.length - visibleCount;

//   const next = () => setStartIndex((prev) => Math.min(prev + 1, maxStartIndex));
//   const prev = () => setStartIndex((prev) => Math.max(prev - 1, 0));

//   // Touch swipe handlers
//   let touchStartX = 0;
//   let touchEndX = 0;

//   const handleTouchStart = (e) => {
//     touchStartX = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e) => {
//     touchEndX = e.touches[0].clientX;
//   };

//   const handleTouchEnd = () => {
//     const distance = touchStartX - touchEndX;
//     if (distance > 50) next(); // swipe left → next
//     if (distance < -50) prev(); // swipe right → prev
//   };

//   return (
//     <div className=" shadow-sm">
//     <section className="py-12 max-w-7xl mx-auto relative ">
//       <h2 className="text-3xl font-bold mb-12 text-green-600 ">
//        ভিডিও গ্যালারি
//       </h2>

//       {/* Carousel Controls */}
//       <button
//         onClick={prev}
//         disabled={startIndex === 0}
//         className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 ${
//           startIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//       >
//         <ChevronLeft size={24} />
//       </button>
//       <button
//         onClick={next}
//         disabled={startIndex === maxStartIndex}
//         className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 ${
//           startIndex === maxStartIndex ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//       >
//         <ChevronRight size={24} />
//       </button>

//       {/* Carousel */}
//       <div
//         className="overflow-hidden relative"
//         ref={carouselRef}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${(startIndex * 100) / visibleCount}%)` }}
//         >
//           {videos.map((video) => (
//             <div
//               key={video.id}
//               className="flex-shrink-0 p-2 cursor-pointer"
//               style={{ width: `${100 / visibleCount}%` }}
//               onClick={() => setActiveVideo(video)}
//             >
//               <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <video src={video.src} className="w-full h-56 object-cover" controls />
//                 <h3 className="text-lg font-semibold text-gray-700 text-center py-2">
//                   {video.title}
//                 </h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal for large video */}
//       {activeVideo && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg overflow-hidden max-w-3xl w-full relative">
//             <button
//               className="absolute top-2 right-2 text-gray-700 text-xl font-bold"
//               onClick={() => setActiveVideo(null)}
//             >
//               ✕
//             </button>
//             <video
//               src={activeVideo.src}
//               controls
//               autoPlay
//               className="w-full h-[500px] object-contain bg-black"
//             />
//             <h3 className="text-lg font-semibold text-gray-700 text-center py-2">
//               {activeVideo.title}
//             </h3>
//           </div>
//         </div>
//       )}
//     </section>
//       </div>
//   );
// }





"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const [visibleCount, setVisibleCount] = useState(4);
  const carouselRef = useRef(null);

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

  const maxStartIndex = videos.length - visibleCount;

  const next = () => setStartIndex((prev) => Math.min(prev + 1, maxStartIndex));
  const prev = () => setStartIndex((prev) => Math.max(prev - 1, 0));

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
        <h2 className="text-3xl font-bold mb-12 text-brandGreen">
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
                    src={video.src}
                    className="w-full h-56 object-cover"
                    controls
                  />
                  <h3 className="text-lg font-semibold text-brandGray text-center py-2">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 bg-brandGray bg-opacity-60 flex items-center justify-center z-50"
            onClick={() => setActiveVideo(null)} // Click outside to close
          >
            <div
              className="bg-white rounded-lg overflow-hidden max-w-3xl w-full relative border border-brandGreen"
              onClick={(e) => e.stopPropagation()} // Prevent inside click closing
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-white bg-brandYellow px-3 py-1 rounded-full z-50 cursor-pointer shadow-md hover:bg-brandGreen transition"
                onClick={() => setActiveVideo(null)}
              >
                ✕
              </button>

              {/* Video */}
              <video
                src={activeVideo.src}
                controls
                autoPlay
                className="w-full h-[500px] object-contain bg-brandGray pointer-events-none"
              />

              <h3 className="text-lg font-semibold text-brandGray text-center py-2">
                {activeVideo.title}
              </h3>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
