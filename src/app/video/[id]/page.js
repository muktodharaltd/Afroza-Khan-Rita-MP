
import ShareButtons from '@/components/common/ShareButtons'
import { notFound } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

async function getVideo(id) {
  try {
    const res = await fetch(`${API_BASE}/api/video-galleries`, {
      cache: 'no-store', // Ensure fresh data
    })
    const result = await res.json()
    return result.data?.find((v) => v.id.toString() === id.toString()) || null
  } catch (err) {
    console.error('Failed to fetch video', err)
    return null
  }
}

export async function generateMetadata({ params }) {
  const { id } = params
  const video = await getVideo(id)

  if (!video) {
    return {
      title: 'ভিডিও পাওয়া যায়নি',
    }
  }

  const title = video.description || 'ভিডিও'
  const videoContentUrl =
    video.type === 'Youtube' && video.video_id
      ? `https://www.youtube.com/v/${video.video_id}` // Flash/Direct URL format often works better for fb og:video than embed
      : video.video
  
  const videoEmbedUrl =
     video.type === 'Youtube' && video.video_id
       ? `https://www.youtube.com/embed/${video.video_id}`
       : video.video

  const images = []
  if (video.type === 'Youtube' && video.video_id) {
    images.push({
      url: `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`,
      width: 1280,
      height: 720,
    })
  }

  return {
    title: title,
    description: title,
    openGraph: {
      title: title,
      description: title,
      type: 'video.other',
      videos: [
        {
          url: videoEmbedUrl, // Player URL
          secureUrl: videoEmbedUrl,
          type: video.type === 'Youtube' ? 'text/html' : 'video/mp4',
          width: 1280,
          height: 720,
        },
        // Fallback for direct stream if applicable, handled by multiple entries if needed
      ],
      images: images,
    },
    twitter: {
      card: 'player',
      title: title,
      description: title,
      players: [
        {
             url: videoEmbedUrl,
             width: 1280,
             height: 720,
        }
      ],
      images: images.map(i => i.url),
    }
  }
}

export default async function VideoDetailPage({ params }) {
  const { id } = params
  const video = await getVideo(id)

  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500">ভিডিও পাওয়া যায়নি</p>
      </div>
    )
  }

  const getYoutubeEmbed = (video_id) =>
    `https://www.youtube.com/embed/${video_id}?rel=0&modestbranding=1&autoplay=1`

  const shareUrl = process.env.NEXT_PUBLIC_SITE_URL 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/video/${video.id}`
    : undefined // Let ShareButtons handle fallback to window.location if undefined, but separate component handles hydration mismatch

  // We need a wrapper for ShareButtons to avoid hydration errors if using window.location inside it without knowing we are on client. 
  // However, ShareButtons is a client component and uses useEffect, so it's safe. 
  // But passing a specific URL is better for server-side correctness.

  /* 
     Video Player: 
     Youtube: iframe
     Local: video tag
  */

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Video Player Section */}
        <div className="relative bg-black aspect-video w-full">
          {video.type === 'Youtube' && video.video_id ? (
            <iframe
              src={getYoutubeEmbed(video.video_id)}
              title={video.description || 'Video'}
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
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            {video.description || 'ভিডিও'}
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
               {/* Optional: Add date or other metadata if available */}
            </div>
            
            <div className="flex items-center gap-3">
               <span className="text-gray-600 font-medium">শেয়ার করুন:</span>
               <ShareButtons
                  title={video.description || "Video"}
                  className="gap-2"
                  url={
                    video.type === 'Youtube' && video.video_id
                      ? `https://www.youtube.com/watch?v=${video.video_id}`
                      : shareUrl 
                  }
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
