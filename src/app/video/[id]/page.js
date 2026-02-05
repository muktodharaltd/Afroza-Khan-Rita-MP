
import { redirect } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

async function getVideo(id) {
  try {
    // Fetch all videos since we might not have a single video endpoint
    // If there is a single endpoint like /api/video-galleries/:id, that would be better
    // But assuming the list is not huge for now based on the component code
    const res = await fetch(`${API_BASE}/api/video-galleries`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch videos')
    }

    const Result = await res.json()
    const videos = Result.data || []
    return videos.find((v) => v.id === parseInt(id)) || null
  } catch (error) {
    console.error('Video fetch error:', error)
    return null
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const video = await getVideo(id)

  if (!video) {
    return {
      title: 'Video Not Found',
    }
  }

  const title = video.description || 'Video Gallery'
  const description = video.description || 'Watch this video'
  // Use a default image if video specific one is missing, or rely on OG video preview
  const image = video.image || 'https://placehold.co/600x400?text=Video+Preview' 

  // Base Open Graph
  const openGraph = {
    title: title,
    description: description,
    type: 'video.other', // or 'website' with video tags
    url: `${process.env.NEXT_PUBLIC_API_URL || 'https://mpDetails.com'}/video/${id}`, // ideally absolute URL
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  }

  // Video specific tags
  if (video.type === 'Youtube' && video.video_id) {
    // Facebook handles Youtube specifically well with just the URL often, 
    // but explicit tags help. 
    // Secure Embed URL is key.
    openGraph.videos = [
      {
        url: `https://www.youtube.com/embed/${video.video_id}`,
        secureUrl: `https://www.youtube.com/embed/${video.video_id}`,
        type: 'text/html',
        width: 1280,
        height: 720,
      },
      {
        url: `https://www.youtube.com/v/${video.video_id}`,
        secureUrl: `https://www.youtube.com/v/${video.video_id}`,
        type: 'application/x-shockwave-flash',
        width: 1280,
        height: 720,
      }
    ]
  } else if (video.video) {
    // Local Video (MP4)
    // Make sure 'video.video' is a full URL. If it's relative, we need to prepend domain (API_BASE usually serves static?)
     // Based on previous code: src={video.video} implies it works as src. 
     // We assume it's a full URL or relative to public. 
     // For OG tags, it MUST be an absolute URL.
     
    let videoUrl = video.video
    if (videoUrl.startsWith('/')) {
        // It's relative, prepend backend base URL if it's served from there, or frontend if public
        // Usually file uploads come from backend
        videoUrl = `${API_BASE}${videoUrl}`
    }

    openGraph.videos = [
      {
        url: videoUrl,
        secureUrl: videoUrl, // Must be HTTPS for FB to play inline
        type: 'video/mp4',
        width: 1280, // Estimates
        height: 720,
      },
    ]
  }

  return {
    title: title,
    description: description,
    openGraph: openGraph,
    twitter: {
      card: 'player',
      title: title,
      description: description,
      images: [image],
      players: openGraph.videos?.map(v => ({
        url: v.secureUrl || v.url,
        width: v.width,
        height: v.height
      })) || []
    },
  }
}

import VideoRedirect from './VideoRedirect'

export default async function VideoPage({ params }) {
  const { id } = await params
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
       <div className="animate-pulse">Loading video...</div>
       <VideoRedirect destination="/" />
    </div>
  )
}

