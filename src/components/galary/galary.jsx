

'use client'

import Image from 'next/image'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { useEffect, useState, useRef } from 'react'
import { CloudSnow } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL
 console.log(API_BASE)

export default function PhotoGalleryView() {
  const viewRef = useRef(null)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('API BASE 👉', API_BASE)

    if (!API_BASE) return

    const fetchPhotos = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/photo-galleries`)
        const result = await res.json()
        setPhotos(result.data || [])
      } catch (err) {
        console.error('Gallery load failed', err)
        setPhotos([])
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  return (
    <div className="shadow-sm py-10">
      <PhotoProvider>
        <section
          ref={viewRef}
          className="max-w-7xl mx-auto mb-5 scroll-mt-17"
        >
          <h2 className="text-3xl mb-4 ml-5 font-bold text-brandGreen">
            ফটো গ্যালারি
          </h2>

          {loading && (
            <p className="ml-5 text-gray-500">লোড হচ্ছে...</p>
          )}

          {!loading && photos.length === 0 && (
            <p className="ml-5 text-red-500">কোনো ছবি পাওয়া যায়নি</p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 px-5">
            {photos.map((photo, index) => (
              <PhotoView key={photo.id} src={photo.image}>
                <div className="relative w-full h-60 sm:h-40 lg:h-80 cursor-pointer overflow-hidden rounded-md">
                  <Image
                    src={photo.image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    unoptimized
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </PhotoView>
            ))}
          </div>
        </section>
      </PhotoProvider>
    </div>
  )
}
