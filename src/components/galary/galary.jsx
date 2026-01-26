// 'use client'

// import Image from 'next/image'
// import { PhotoProvider, PhotoView } from 'react-photo-view'
// import 'react-photo-view/dist/react-photo-view.css'
// import { useEffect, useState } from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

// export default function PhotoGalleryView() {
//   const [photos, setPhotos] = useState([])
//   const [loading, setLoading] = useState(true)

//   // track current image index per gallery item
//   const [activeIndex, setActiveIndex] = useState({})

//   useEffect(() => {
//     if (!API_BASE) return

//     const fetchPhotos = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/photo-galleries`)
//         const result = await res.json()
//         setPhotos(result.data || [])
//       } catch (err) {
//         console.error('Gallery load failed', err)
//         setPhotos([])
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchPhotos()
//   }, [])

//   const handlePrev = (id, total) => {
//     setActiveIndex((prev) => ({
//       ...prev,
//       [id]: prev[id] > 0 ? prev[id] - 1 : total - 1,
//     }))
//   }

//   const handleNext = (id, total) => {
//     setActiveIndex((prev) => ({
//       ...prev,
//       [id]: prev[id] < total - 1 ? prev[id] + 1 : 0,
//     }))
//   }

//   return (
//     <div className="shadow-sm py-10">
//       <PhotoProvider>
//         <section className="max-w-7xl mx-auto mb-5">
//           <h2 className="text-3xl mb-4 ml-5 font-bold text-brandGreen">
//             ফটো গ্যালারি
//           </h2>

//           {loading && <p className="ml-5 text-gray-500">লোড হচ্ছে...</p>}
//           {!loading && photos.length === 0 && (
//             <p className="ml-5 text-red-500">কোনো ছবি পাওয়া যায়নি</p>
//           )}

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-5">
//             {photos.map((item) => {
//               const current = activeIndex[item.id] || 0
//               const currentImg = item.images[current]

//               return (
//                 <PhotoView
//                   key={item.id}
//                   src={currentImg}
//                   overlay={item.description}
//                 >
//                   <div className="group relative w-full h-60 sm:h-40 lg:h-80 cursor-pointer overflow-hidden rounded-md">
//                     <Image
//                       src={currentImg}
//                       alt="Gallery"
//                       fill
//                       unoptimized
//                       className="object-cover transition-transform duration-300 group-hover:scale-105"
//                     />

//                     {/* Hover Overlay */}
//                     {item.images.length > 1 && (
//                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between">
//                         {/* Description */}
//                         {item.description && (
//                           <p className="text-white text-sm p-3">
//                             {item.description}
//                           </p>
//                         )}

//                         {/* Navigation */}
//                         <div className="flex justify-between items-center px-3 pb-3">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation()
//                               handlePrev(item.id, item.images.length)
//                             }}
//                             className="bg-white/80 p-1 rounded-full hover:bg-white"
//                           >
//                             <ChevronLeft size={20} />
//                           </button>

//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation()
//                               handleNext(item.id, item.images.length)
//                             }}
//                             className="bg-white/80 p-1 rounded-full hover:bg-white"
//                           >
//                             <ChevronRight size={20} />
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </PhotoView>
//               )
//             })}
//           </div>
//         </section>
//       </PhotoProvider>
//     </div>
//   )
// }

// 'use client'

// import Image from 'next/image'
// import { PhotoProvider, PhotoView } from 'react-photo-view'
// import 'react-photo-view/dist/react-photo-view.css'
// import { useEffect, useState } from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

// export default function PhotoGalleryView() {
//   const [photos, setPhotos] = useState([])
//   const [loading, setLoading] = useState(true)

//   const [activeIndex, setActiveIndex] = useState({})

//   useEffect(() => {
//     if (!API_BASE) return

//     const fetchPhotos = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/photo-galleries`)
//         const result = await res.json()
//         setPhotos(result.data || [])
//       } catch (err) {
//         console.error('Gallery load failed', err)
//         setPhotos([])
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchPhotos()
//   }, [])

//   const handlePrev = (id, total) => {
//     setActiveIndex((prev) => ({
//       ...prev,
//       [id]: prev[id] > 0 ? prev[id] - 1 : total - 1,
//     }))
//   }

//   const handleNext = (id, total) => {
//     setActiveIndex((prev) => ({
//       ...prev,
//       [id]: prev[id] < total - 1 ? prev[id] + 1 : 0,
//     }))
//   }

//   return (
//     <div className="shadow-sm py-10">
//       <PhotoProvider
//         overlayRender={({ index }) => (
//           <div className="absolute bottom-6 left-0 right-0 flex justify-center px-4">
//             <p className="bg-black/60 text-white text-sm px-4 py-2 rounded">
//               {photos.flatMap((p) => p.images.map(() => p.description))[index]}
//             </p>
//           </div>
//         )}
//       >
//         <section className="max-w-7xl mx-auto mb-5">
//           <h2 className="text-3xl mb-4 ml-5 font-bold text-brandGreen">
//             ফটো গ্যালারি
//           </h2>

//           {loading && <p className="ml-5 text-gray-500">লোড হচ্ছে...</p>}
//           {!loading && photos.length === 0 && (
//             <p className="ml-5 text-red-500">কোনো ছবি পাওয়া যায়নি</p>
//           )}

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-5">
//             {photos.map((item) => {
//               const current = activeIndex[item.id] || 0

//               return (
//                 // <div
//                 //   key={item.id}
//                 //   className="group relative w-full h-60 sm:h-40 lg:h-80 cursor-pointer overflow-hidden rounded-md"
//                 // >
//                 //   {/* ALL PhotoViews (hidden except active) */}
//                 //   {item.images.map((img, idx) => (
//                 //     <PhotoView key={idx} src={img}>
//                 //       {idx === current && (
//                 //         <Image
//                 //           src={img}
//                 //           alt={item.description || 'Gallery'}
//                 //           fill
//                 //           unoptimized
//                 //           className="object-cover transition-transform duration-300 group-hover:scale-105"
//                 //         />
//                 //       )}
//                 //     </PhotoView>
//                 //   ))}

//                 //   {/* Hover Overlay */}
//                 //   {item.images.length > 1 && (
//                 //     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between">
//                 //       {item.description && (
//                 //         <p className="text-white text-sm p-3">
//                 //           {item.description}
//                 //         </p>
//                 //       )}

//                 //       <div className="flex justify-between items-center px-3 pb-3">
//                 //         <button
//                 //           onClick={(e) => {
//                 //             e.stopPropagation()
//                 //             handlePrev(item.id, item.images.length)
//                 //           }}
//                 //           className="bg-white/80 p-1 rounded-full hover:bg-white"
//                 //         >
//                 //           <ChevronLeft size={20} />
//                 //         </button>

//                 //         <button
//                 //           onClick={(e) => {
//                 //             e.stopPropagation()
//                 //             handleNext(item.id, item.images.length)
//                 //           }}
//                 //           className="bg-white/80 p-1 rounded-full hover:bg-white"
//                 //         >
//                 //           <ChevronRight size={20} />
//                 //         </button>
//                 //       </div>
//                 //     </div>
//                 //   )}
//                 // </div>

//                 <div
//                   key={item.id}
//                   className="group relative w-full h-60 sm:h-40 lg:h-80 cursor-pointer overflow-hidden rounded-md"
//                 >
//                   {/* Visible Image (ONLY ONE) */}
//                   <div className="absolute inset-0">
//     <PhotoView src={item.images[current]}>
//       <Image
//         src={item.images[current]}
//         alt={item.description || 'Gallery'}
//         fill
//         unoptimized
//         className="object-cover transition-transform duration-300 group-hover:scale-105"
//       />
//     </PhotoView>
//   </div>

//                   {/* Hidden PhotoViews (for zoom navigation) */}
//                   <div className="hidden">
//                     {item.images.map((img, idx) => (
//                       <PhotoView key={idx} src={img} />
//                     ))}
//                   </div>

//                   {/* Hover Overlay */}
//                   {item.images.length > 1 && (
//                     <div className="absolute bottom-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between">
//                       {item.description && (
//                         <p className="text-white text-sm p-3">
//                           {item.description}
//                         </p>
//                       )}

//                       <div className="flex justify-between items-center px-3 pb-3">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             handlePrev(item.id, item.images.length)
//                           }}
//                           className="bg-white/80 p-1 rounded-full hover:bg-white"
//                         >
//                           <ChevronLeft size={20} />
//                         </button>

//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             handleNext(item.id, item.images.length)
//                           }}
//                           className="bg-white/80 p-1 rounded-full hover:bg-white"
//                         >
//                           <ChevronRight size={20} />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )
//             })}
//           </div>
//         </section>
//       </PhotoProvider>
//     </div>
//   )
// }




// 'use client'

// import Image from 'next/image'
// import { PhotoProvider, PhotoView } from 'react-photo-view'
// import 'react-photo-view/dist/react-photo-view.css'
// import { useEffect, useState } from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

// export default function PhotoGalleryView() {
//   const [photos, setPhotos] = useState([])
//   const [loading, setLoading] = useState(true)

//   // current image index per gallery
//   const [activeIndex, setActiveIndex] = useState({})

//   useEffect(() => {
//     if (!API_BASE) return

//     const fetchPhotos = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/photo-galleries`)
//         const result = await res.json()
//         setPhotos(result.data || [])
//       } catch (err) {
//         console.error('Gallery load failed', err)
//         setPhotos([])
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchPhotos()
//   }, [])

//   const handlePrev = (id, total) => {
//     setActiveIndex((prev) => ({
//       ...prev,
//       [id]: prev[id] > 0 ? prev[id] - 1 : total - 1,
//     }))
//   }

//   const handleNext = (id, total) => {
//     setActiveIndex((prev) => ({
//       ...prev,
//       [id]: prev[id] < total - 1 ? prev[id] + 1 : 0,
//     }))
//   }

//   return (
//     <div className="shadow-sm py-10">
//       <PhotoProvider>
//         <section className="max-w-7xl mx-auto mb-5">
//           <h2 className="text-3xl mb-4 ml-5 font-bold text-brandGreen">
//             ফটো গ্যালারি
//           </h2>

//           {loading && <p className="ml-5 text-gray-500">লোড হচ্ছে...</p>}
//           {!loading && photos.length === 0 && (
//             <p className="ml-5 text-red-500">কোনো ছবি পাওয়া যায়নি</p>
//           )}

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-5">
//             {photos.map((item) => {
//               const current = activeIndex[item.id] || 0

//               return (
//                 <div
//                   key={item.id}
//                   className="group relative w-full h-60 sm:h-40 lg:h-80 cursor-pointer overflow-hidden rounded-md"
//                 >
//                   {/* Visible Image (ONLY ONE PhotoView) */}
//                   <PhotoView src={item.images[current]}>
//                     <Image
//                       src={item.images[current]}
//                       alt={item.description || 'Gallery'}
//                       fill
//                       unoptimized
//                       className="object-cover transition-transform duration-300 group-hover:scale-105"
//                     />
//                   </PhotoView>

//                   {/* Hidden PhotoViews (EXCEPT current) */}
//                   <div className="hidden">
//                     {item.images.map((img, idx) =>
//                       idx !== current ? (
//                         <PhotoView key={idx} src={img} />
//                       ) : null
//                     )}
//                   </div>

//                   {/* Hover Overlay */}
//                   <div className="pointer-events-none absolute bottom-0 w-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between">
//                     {item.description && (
//                       <p className="text-white text-sm p-3">
//                         {item.description}
//                       </p>
//                     )}
//                   </div>

//                   {/* Hover Controls */}
//                   {item.images.length > 1 && (
//                     <div className="absolute bottom-3 left-0 right-0 flex justify-between px-3 opacity-0 group-hover:opacity-100 transition">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handlePrev(item.id, item.images.length)
//                         }}
//                         className="pointer-events-auto bg-white/80 p-1 rounded-full hover:bg-white"
//                       >
//                         <ChevronLeft size={20} />
//                       </button>

//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleNext(item.id, item.images.length)
//                         }}
//                         className="pointer-events-auto bg-white/80 p-1 rounded-full hover:bg-white"
//                       >
//                         <ChevronRight size={20} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )
//             })}
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
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

export default function PhotoGalleryView() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState({})

  useEffect(() => {
    if (!API_BASE) return

    const fetchPhotos = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/photo-galleries`)
        const result = await res.json()
        setPhotos(result.data || [])
      } catch (err) {
        console.error(err)
        setPhotos([])
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  const handlePrev = (id, total) => {
    setActiveIndex((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : total - 1,
    }))
  }

  const handleNext = (id, total) => {
    setActiveIndex((prev) => ({
      ...prev,
      [id]: prev[id] < total - 1 ? prev[id] + 1 : 0,
    }))
  }

  return (
    <div className="shadow-sm py-10">
<PhotoProvider
  overlayRender={({ index }) => {
    const flatDescriptions = photos.flatMap((p) =>
      p.images.map(() => p.description)
    )

    return (
      <div className="absolute top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
        <p className=" text-white text-sm px-4 py-2 rounded mt-3 max-w-[90%] text-center">
          {flatDescriptions[index]}
        </p>
            </div>
          )
        }}
      >
        <section className="max-w-7xl mx-auto mb-5">
          <h2 className="text-3xl mb-4 ml-5 font-bold text-brandGreen">
            ফটো গ্যালারি
          </h2>

          {loading && <p className="ml-5 text-gray-500">লোড হচ্ছে...</p>}
          {!loading && photos.length === 0 && (
            <p className="ml-5 text-red-500">কোনো ছবি পাওয়া যায়নি</p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-5">
            {photos.map((item) => {
              const current = activeIndex[item.id] || 0

              return (
                <div
                  key={item.id}
                  className="group relative w-full h-60 sm:h-40 lg:h-80 cursor-pointer overflow-hidden rounded-md"
                >
                  {/* Visible Image */}
                  <PhotoView src={item.images[current]}>
                    <Image
                      src={item.images[current]}
                      alt={item.description || 'Gallery'}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </PhotoView>

                  {/* Hidden PhotoViews (current বাদ দিয়ে) */}
                  <div className="hidden">
                    {item.images.map((img, idx) =>
                      idx !== current ? (
                        <PhotoView key={idx} src={img} />
                      ) : null
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition">
                    <p className="text-white text-sm p-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover Controls */}
                  {item.images.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-between px-3 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePrev(item.id, item.images.length)
                        }}
                        className="pointer-events-auto bg-white/80 p-1 rounded-full"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleNext(item.id, item.images.length)
                        }}
                        className="pointer-events-auto bg-white/80 p-1 rounded-full"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </PhotoProvider>
    </div>
  )
}
