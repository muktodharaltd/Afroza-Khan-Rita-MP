"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ShareButtons from "@/components/common/ShareButtons";

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL;

export default function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!API_BASE || !id) return;

    const fetchVideo = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/video-galleries`);
        const json = await res.json();

        const found = json.data?.find(
          (v) => String(v.id) === String(id)
        );

        setVideo(found || null);
      } catch (err) {
        console.error("Video load failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500">ভিডিও পাওয়া যায়নি</p>
      </div>
    );
  }

  const getYoutubeEmbed = (id) =>
    `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* 🎬 VIDEO PLAYER */}
        <div className="relative bg-black aspect-video w-full">
          {video.type === "Youtube" && video.video_id ? (
            <iframe
              src={getYoutubeEmbed(video.video_id)}
              title={video.description || "Video"}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : video.type === "Device" && video.video ? (
            <video
              src={video.video}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-contain"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              ভিডিও পাওয়া যায়নি
            </div>
          )}
        </div>

        {/* ℹ️ INFO + SHARE */}
        <div className="p-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            {video.description || "ভিডিও"}
          </h1>

          <div className="flex justify-end pt-4 border-t">
            <div className="flex items-center gap-3">
              <span className="text-gray-600 font-medium">
                শেয়ার করুন:
              </span>
              <ShareButtons
                title={video.description || "Video"}
                url={
                  typeof window !== "undefined"
                    ? window.location.href
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
