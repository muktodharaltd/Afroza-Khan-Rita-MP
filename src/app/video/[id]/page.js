import ShareButtons from '@/components/common/ShareButtons'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

async function getVideo(id) {
  try {
    const res = await fetch(`${API_BASE}/api/video-galleries`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch videos')
    }
    const result = await res.json()
    return result.data?.find((v) => v.id.toString() === id.toString()) || null
  } catch (err) {
    console.error('Failed to fetch video', err)
    return null
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const video = await getVideo(id)

  if (!video) {
    return {
      title: 'ভিডিও পাওয়া যায়নি',
    }
  }

  const title = video.description || 'ভিডিও'
  
  // Thumbnail for both YouTube and local videos
  const thumbnail = video.thumbnail || 
    (video.type === 'Youtube' && video.video_id
      ? `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`
      : null)

  const pageUrl = `https://afrozakhanomrita.com/video/${id}`

  return {
    title: title,
    description: title,
    openGraph: {
      title: title,
      description: title,
      url: pageUrl,
      type: 'video.other',
      images: thumbnail ? [
        {
          url: thumbnail,
          width: 1280,
          height: 720,
          alt: title,
        },
      ] : undefined,
      videos: video.type !== 'Youtube' && video.video ? [
        {
          url: video.video,
          secureUrl: video.video,
          type: 'video/mp4',
          width: 1280,
          height: 720,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: title,
      images: thumbnail ? [thumbnail] : undefined,
    },
  }
}

export default async function VideoDetailPage({ params }) {
  const { id } = await params
  const video = await getVideo(id)

  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500">ভিডিও পাওয়া যায়নি</p>
      </div>
    )
  }

  const getYoutubeEmbed = (video_id) =>
    `https://www.youtube.com/embed/${video_id}?rel=0&modestbranding=1&autoplay=1`

  const videoTitle = video.description || 'ভিডিও'
  const shareUrl = video.type === 'Youtube' && video.video_id
    ? `https://www.youtube.com/watch?v=${video.video_id}`
    : `https://afrozakhanomrita.com/video/${video.id}`

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="mb-5 text-brandGreen underline text-sm font-medium inline-block"
        >
          ← Back
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Video Player Section */}
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
                ভিডিও পাওয়া যায়নি
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="p-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              {videoTitle}
            </h1>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                {/* Optional: Add date or other metadata if available */}
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-gray-600 font-medium">শেয়ার করুন:</span>
                <ShareButtons title={videoTitle} url={shareUrl} className="gap-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
