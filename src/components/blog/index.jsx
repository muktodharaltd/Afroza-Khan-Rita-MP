'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

export default function BlogPosts() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false) // See More toggle

  useEffect(() => {
    if (!API_BASE) return
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs`)
        const result = await res.json()
        setBlogs(result?.data || [])
      } catch (error) {
        console.error('Blog fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  // Only first 4 blogs unless showAll is true
  const displayedBlog = showAll ? blogs : blogs.slice(0, 4)

  return (
    <div className="shadow">
      <div className="max-w-7xl mx-auto py-10">
        <h2 className="text-3xl font-bold mb-8 ml-5 text-brandGreen">
          সাম্প্রতিক ব্লগ পোস্ট
        </h2>

        {loading && <p className="ml-5">লোড হচ্ছে...</p>}

        <div className="flex flex-wrap gap-y-8">
          {displayedBlog.map((post) => (
            <div key={post.id} className="w-full md:w-1/2 px-4">
              <div
                className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden gap-5"
                style={{ backgroundColor: 'rgba(84, 84, 84, 0.08)' }}
              >
                <div className="md:w-1/3 p-4">
                  <Link href={`/blog/${post.id}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </Link>
                </div>

                <div className="md:w-2/3 p-6">
                  <Link href={`/blog/${post.id}`}>
                    <h2 className="text-lg md:text-xl font-bold text-brandGray mb-3">
                      {post.title}
                    </h2>
                  </Link>

                  <div className="text-brandGray mb-2 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post?.description }}
                  />


                  {/* <p className="text-brandGray mb-2 line-clamp-3">
                    {post.description_second}
                  </p>
                  <p className="text-brandGray mb-2 line-clamp-3">
                    {post.description_third}
                  </p> */}

                  <Link href={`/blog/${post.id}`}>
                    <p className="text-brandGreen underline text-sm font-medium">
                      Read more...
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        {!showAll && blogs.length > 4 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 bg-brandGreen text-white rounded-md shadow hover:bg-brandYellow transition"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
