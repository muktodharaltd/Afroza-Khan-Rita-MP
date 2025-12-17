// 'use client'

// import Image from 'next/image'
// import { PhotoProvider, PhotoView } from 'react-photo-view'
// import 'react-photo-view/dist/react-photo-view.css'
// import { useRef } from 'react'
// import PhotoGallery from 'http://192.168.68.108:8000/api/photo-galleries'

// export default function DeluxeRoomView() {
//   const viewRef = useRef(null)

//   return (
//     <div className=" shadow-sm py-10">
//       <PhotoProvider>
//         {/* ========== View Section ========== */}
//         <section
//           ref={viewRef}
//           className=" max-w-7xl mx-auto mb-5 border-brandGray scroll-mt-17 "
//         >
//           <h2 className="text-3xl mb-3 ml-5 font-bold text-brandGreen">
//             ফটো গ্যালারি
//           </h2>

//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
//             {/* Image 1 */}
//             <PhotoView src="/one.jpg">
//               <div className="relative w-full h-24 sm:h-40 lg:h-50">
//                 <Image
//                   src="/one.jpg"
//                   alt="Guest room"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </PhotoView>

//             {/* Image 2 */}
//             <PhotoView src="/two.jpg">
//               <div className="relative w-full h-24 sm:h-40 lg:h-50">
//                 <Image
//                   src="/two.jpg"
//                   alt="Guest room"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </PhotoView>

//             {/* Image 3 */}
//             <PhotoView src="/four.jpg">
//               <div className="relative w-full h-24 sm:h-40 lg:h-50">
//                 <Image
//                   src="/four.jpg"
//                   alt="Guest room"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </PhotoView>

//             {/* Large Image */}
//             <div className="col-span-2 sm:col-span-2 sm:row-span-2">
//               <PhotoView src="/three.jpg">
//                 <div className="relative w-full h-[180px] sm:h-[250px] lg:h-[417px] rounded-md overflow-hidden">
//                   <Image
//                     src="/three.jpg"
//                     alt="Guest room"
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//               </PhotoView>
//             </div>

//             {/* Image 4 */}
//             <PhotoView src="/five.jpg">
//               <div className="relative w-full h-24 sm:h-40 lg:h-50">
//                 <Image
//                   src="/five.jpg"
//                   alt="Guest room"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </PhotoView>

//             {/* Image 5 */}
//             <PhotoView src="/six.jpg">
//               <div className="relative w-full h-24 sm:h-40 lg:h-50">
//                 <Image
//                   src="/six.jpg"
//                   alt="Guest room"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </PhotoView>
//           </div>
//         </section>
//       </PhotoProvider>
//     </div>
//   )
// }
   




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
                <div className="relative w-full h-24 sm:h-40 lg:h-52 cursor-pointer overflow-hidden rounded-md">
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
