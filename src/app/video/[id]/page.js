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

function getYouTubeId(url, videoIdField) {
  if (videoIdField) return videoIdField
  if (!url) return null
  const s = String(url).trim()
  
  // 1. Raw 11-char ID
  if (s.length === 11 && /^[a-zA-Z0-9_-]{11}$/.test(s)) return s

  // 2. Standard Regex for various formats
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
  const match = s.match(regex)
  return match ? match[1] : null
}

function absoluteVideoUrl(video) {
  if (!video) return null
  const videoId = video.video_id
  const videoField = video.video ? String(video.video).trim() : null
  
  // If it's a YouTube video via ID field
  if (videoId) return `https://www.youtube.com/watch?v=${videoId}`
  if (!videoField) return null

  // If it's a YouTube URL or already absolute
  if (getYouTubeId(videoField)) return videoField
  if (videoField.startsWith('http')) return videoField
  
  // Handle YouTube domain without protocol (v= format)
  if (videoField.toLowerCase().includes('youtube.com') || videoField.toLowerCase().includes('youtu.be')) {
    return videoField.startsWith('//') ? `https:${videoField}` : `https://${videoField}`
  }

  return `${API_BASE}/${videoField.replace(/^\//, '')}`
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const video = await getVideo(id)
  if (!video) return { title: 'Video Not Found' }

  const pageUrl = `${SITE_URL}/video/${id}`
  const videoUrl = absoluteVideoUrl(video)
  const title = video.title || video.description || 'ভিডিও'
  const description = video.description || title
  const ytId = getYouTubeId(videoUrl, video.video_id)

  const thumbnailUrl = video.thumbnail
    ? (video.thumbnail.startsWith('http') ? video.thumbnail : `${API_BASE}/${video.thumbnail.replace(/^\//, '')}`)
    : (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null)

  const ogImages = thumbnailUrl
    ? [{ url: thumbnailUrl, width: 1280, height: 720, alt: title }]
    : [{ url: `${SITE_URL}/logo.jpg`, width: 1200, height: 630, alt: 'Afroza Khanrita' }]

  const metadata = {
    title: title,
    description: description,
    alternates: { canonical: pageUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Afroza Khanrita',
      type: 'video.other',
      images: ogImages,
      locale: 'bn_BD',
    },
    twitter: {
      card: 'player',
      title,
      description,
      site: '@afrozakhanrita',
      images: thumbnailUrl ? [thumbnailUrl] : [],
    },
  }

  if (videoUrl && !ytId) {
    const secureVideoUrl = videoUrl.startsWith('http') ? videoUrl.replace(/^http:\/\//i, 'https://') : videoUrl
    metadata.openGraph.videos = [
      {
        url: secureVideoUrl,
        secureUrl: secureVideoUrl,
        type: 'video/mp4',
        width: 1280,
        height: 720,
      },
    ]
    metadata.twitter.players = [
      {
        playerUrl: pageUrl,
        streamUrl: secureVideoUrl,
        width: 1280,
        height: 720,
      },
    ]
    metadata.other = {
      'og:video:url': secureVideoUrl,
      'og:video:secure_url': secureVideoUrl,
      'og:video:type': 'video/mp4',
    }
  }

  return metadata
}

export default async function VideoPage({ params }) {
  const { id } = await params
  const video = await getVideo(id)

  if (!video) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <p className="text-red-500 font-bold">ভিডিও পাওয়া যায়নি</p>
        <Link href="/" className="text-brandGreen underline mt-4 inline-block">
          ← হোমপেজে ফিরে যান
        </Link>
      </div>
    )
  }

  const videoSrc = absoluteVideoUrl(video)
  const title = video.title || video.description || 'ভিডিও'
  const ytId = getYouTubeId(videoSrc, video.video_id)

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 min-h-screen">
      <Link
        href="/"
        className="mb-6 text-brandGreen hover:underline text-sm font-semibold flex items-center gap-1"
      >
        <span>←</span> হোমপেজ
      </Link>

      <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-brandGreen leading-tight">
        {title}
      </h1>

      <div className="mb-6">
        <ShareButtons
          url={`${SITE_URL}/video/${id}`}
          title={title}
          description={video.description || ''}
        />
      </div>

      <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video relative group border-4 border-white/10">
        {ytId ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?rel=0&autoplay=1`}
            title={title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            key={videoSrc}
            src={videoSrc}
            controls
            playsInline
            className="w-full h-full object-contain"
            poster={video.thumbnail ? (video.thumbnail.startsWith('http') ? video.thumbnail : `${API_BASE}/${video.thumbnail}`) : undefined}
          />
        )}
      </div>    
    </div>
  )
}



