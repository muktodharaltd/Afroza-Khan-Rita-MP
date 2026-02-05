import Link from 'next/link'
import ShareButtons from './ShareButtons'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afrozakhanamrita.com'

async function getVideo(id) {
  try {
    const res = await fetch(`${API_BASE}/api/video-galleries`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch videos')
    const result = await res.json()
    const list = result.data || []
    return list.find((v) => String(v.id) === String(id)) || null
  } catch (e) {
    console.error('Video fetch error:', e)
    return null
  }
}

function absoluteVideoUrl(video) {
  if (!video?.video) return null
  const url = video.video
  return url.startsWith('http') ? url : `${API_BASE}/${url.replace(/^\//, '')}`
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const video = await getVideo(id)
  if (!video) return { title: 'Video Not Found' }

  const pageUrl = `${SITE_URL}/video/${id}`
  const videoUrl = absoluteVideoUrl(video)
  const title = video.title || video.description || 'ভিডিও'
  const description = video.description || title

  // For Facebook to PLAY video in feed: og:video = direct HTTPS .mp4 URL.
  const directVideoUrl = videoUrl ? String(videoUrl).replace(/^http:\/\//i, 'https://') : null
  const thumbnailUrl = video.thumbnail
    ? (video.thumbnail.startsWith('http') ? video.thumbnail : `${API_BASE}/${video.thumbnail.replace(/^\//, '')}`)
    : null

  return {
    title: title,
    description: description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'video.other',
      videos: directVideoUrl
        ? [{
            url: directVideoUrl,
            secureUrl: directVideoUrl,
            type: 'video/mp4',
            width: 1280,
            height: 720,
          }]
        : undefined,
      // Thumbnail = shown in share preview with title; video still plays on FB
      images: thumbnailUrl
        ? [{ url: thumbnailUrl, width: 1280, height: 720, alt: title }]
        : undefined,
    },
    twitter: {
      card: 'player',
      title,
      description,
      players: videoUrl
        ? [{ playerUrl: pageUrl, streamUrl: videoUrl, width: 1280, height: 720 }]
        : [{ playerUrl: pageUrl, streamUrl: pageUrl, width: 1280, height: 720 }],
    },
  }
}

export default async function VideoPage({ params }) {
  const { id } = await params
  const video = await getVideo(id)

  if (!video) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <p className="text-red-500">ভিডিও পাওয়া যায়নি</p>
        <Link href="/" className="text-brandGreen underline mt-4 inline-block">
          ← হোম
        </Link>
      </div>
    )
  }

  const videoSrc = absoluteVideoUrl(video) || video.video
  const title = video.title || video.description || 'ভিডিও'

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Link
        href="/"
        className="mb-5 text-brandGreen underline text-sm font-medium inline-block"
      >
        ← হোম
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-brandGreen">
        {title}
      </h1>

      <ShareButtons
        url={`${SITE_URL}/video/${id}`}
        title={title}
        description={video.description || ''}
      />

      <div className="bg-black rounded-lg overflow-hidden shadow-lg">
        <video
          key={videoSrc}
          src={videoSrc}
          controls
          autoPlay
          playsInline
          className="w-full aspect-video object-contain"
          poster={video.thumbnail ? (video.thumbnail.startsWith('http') ? video.thumbnail : `${API_BASE}/${video.thumbnail}`) : undefined}
        />
      </div>

      {video.description && (
        <p className="mt-4 text-gray-700 text-lg">{video.description}</p>
      )}
    </div>
  )
}
