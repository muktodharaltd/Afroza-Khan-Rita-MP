'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

export default function BlogList() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    if (!API_BASE) return

    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/news-links`)
        const result = await res.json()
        setNews(result.data || [])
      } catch (err) {
        console.error('news load failed', err)
        setNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const limitWords = (text, limit = 12) => {
    if (!text) return ''
    return text.split(' ').slice(0, limit).join(' ') + '...'
  }

  const displayedNews = showAll ? news : news.slice(0, 6)

  if (loading) {
    return <p className="text-center">Loading...</p>
  }

  return (
    <div className="shadow pb-20">
      <div className="grid grid-cols-1 pt-10 max-w-7xl mx-auto ">
        <h2 className="text-3xl mb-4 font-bold text-brandGreen">
          সাম্প্রতিক খবর
        </h2>
        <div className="grid grid-cols-1    max-w-7xl mx-auto md:grid-cols-3 gap-6">
          {displayedNews.map((item) => (
            <div key={item.id} className="  overflow shadow">
              {/* ✅ Image fixed */}
              <div className="relative w-full h-[300px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="p-4">
                <Link href={item.url} target="_blank">
                  <h2 className="text-xl cursor-pointer">{item.title}</h2>
                </Link>

                <p className="text-gray-600 mt-2">
                  <Link href={item.url} target="_blank">
                    {limitWords(item.description, 10)}
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>

        {!showAll && news.length > 6 && (
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
