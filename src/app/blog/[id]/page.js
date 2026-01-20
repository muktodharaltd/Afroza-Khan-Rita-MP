import Link from 'next/link'
import Image from 'next/image'
import ShareButtons from './ShareButtons'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

async function getBlog(id) {
  try {
    // Fetch fresh data every time
    const res = await fetch(`${API_BASE}/api/blogs`, { cache: 'no-store' })
    if (!res.ok) {
      throw new Error('Failed to fetch blogs')
    }
    const result = await res.json()
    // Find blog by id
    return result.data.find((b) => b.id === parseInt(id)) || null
  } catch (error) {
    console.error('Blog fetch error:', error)
    return null
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const blog = await getBlog(id)

  if (!blog) {
    return {
      title: 'Blog Not Found',
    }
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      images: [
        {
          url: blog.image,
          width: 702,
          height: 389,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
  }
}

export default async function BlogDetail({ params }) {
  const { id } = await params
  const blog = await getBlog(id)

  if (!blog) {
    return <p className="ml-5 mt-5 text-red-500">Blog পাওয়া যায়নি</p>
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Link
        href="/"
        className="mb-5 text-brandGreen underline text-sm font-medium inline-block"
      >
        ← Back
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brandGreen">
        {blog.title}
      </h1>

      {/* 🔹 Share Buttons */}
      <ShareButtons title={blog.title} />

      {blog.image && (
        <div className="relative w-full h-auto mb-6">
           {/* Using standard img for simplicity with dynamic external URLs or Next Image if configured */}
           <img
            src={blog.image}
            alt={blog.title}
            className="w-full rounded-md object-cover"
          />
        </div>
      )}

      <div className="space-y-5">
       <div
  className="text-gray-700 text-lg md:text-xl text-justify"
  dangerouslySetInnerHTML={{ __html: blog.description }}
/>


        
      </div>
    </div>
  )
}

