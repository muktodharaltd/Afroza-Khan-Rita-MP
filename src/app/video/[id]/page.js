'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Head from 'next/head'
import ShareButtons from '@/components/common/ShareButtons'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

export default function VideoDetailPage() {
  const { id } = useParams()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!API_BASE || !id) return

    const fetchVideo = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/video-galleries`)
        const result = await res.json()
        const found = result.data?.find((v) => v.id.toString() === id.toString())
        setVideo(found)
      } catch (err) {
        console.error('Failed to fetch video', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500">লোড হচ্ছে...</p>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500">ভিডিও পাওয়া যায়নি</p>
      </div>
    )
  }

  const getYoutubeEmbed = (video_id) =>
    `https://www.youtube.com/embed/${video_id}?rel=0&modestbranding=1&autoplay=1`

  const videoTitle = video.description || 'ভিডিও'
  const videoUrl =
    video.type === 'Youtube' && video.video_id
      ? `https://www.youtube.com/watch?v=${video.video_id}`
      : typeof window !== 'undefined'
      ? window.location.href
      : ''
  const videoImage =
    video.thumbnail || (video.type === 'Youtube' ? `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg` : '')

  return (
    <>
      {/* 🔹 Head Meta for SEO & Social Share */}
      <Head>
        <title>{videoTitle}</title>
        <meta name="description" content={videoTitle} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="video.other" />
        <meta property="og:title" content={videoTitle} />
        <meta property="og:description" content={videoTitle} />
        {videoImage && <meta property="og:image" content={videoImage} />}
        <meta property="og:url" content={videoUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={videoTitle} />
        <meta name="twitter:description" content={videoTitle} />
        {videoImage && <meta name="twitter:image" content={videoImage} />}
      </Head>

      {/* 🔹 Page Content */}
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Video Player */}
          <div className="relative bg-black aspect-video w-full">
            {video.type === 'Youtube' && video.video_id ? (
              <iframe
                src={getYoutubeEmbed(video.video_id)}
                title={videoTitle}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : video.video ? (
              <video
                src={video.video}
                controls
                autoPlay
                className="absolute inset-0 w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                ভিডিও পাওয়া যায়নি
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="p-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">{videoTitle}</h1>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">{/* Optional date or meta */}</div>

              <div className="flex items-center gap-3">
                <span className="text-gray-600 font-medium">শেয়ার করুন:</span>
                <ShareButtons title={videoTitle} url={videoUrl} className="gap-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
