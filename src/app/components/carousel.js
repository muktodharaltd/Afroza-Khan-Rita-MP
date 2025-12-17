// 'use client'

// import { useEffect, useState } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Autoplay } from 'swiper/modules'
// import 'swiper/css'
// import Image from 'next/image'
// import Link from 'next/link'

// const slogans = [
//   'আপনি বলবেন, আমি শুনবো একসাথে দেশ গড়বো',
// ]

// export default function HeroSlider() {

//   const [display, setDisplay] = useState('')
//   const fullText = slogans[0]

//   // 🔥 Type the text only ONCE
//   useEffect(() => {
//     let timer

//     if (display.length < fullText.length) {
//       timer = setTimeout(
//         () => setDisplay(fullText.slice(0, display.length + 1)),
//         70
//       )
//     }

//     return () => clearTimeout(timer)
//   }, [display, fullText])


//   return (
//     <section className="w-full bg-white mt-5 shadow-sm ">
//       <div className="w-full px-0 md:px-10 py-0">
//         <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6">

//           {/* Left Text Section */}
//           <div className="w-full md:w-5/12 flex items-center justify-center md:justify-start px-4 md:h-[450px]">

//             <div className="w-full flex flex-col justify-center h-full min-h-[30px]">

//               {/* 🔥 TITLE — Typing once + fixed height */}
//               <h1
//                 className="
//                   text-[18px] sm:text-[22px] md:text-[26px] lg:text-[36px]
//                   font-semibold text-brandGreen leading-snug 
//                   md:leading-snug lg:leading-tight
//                   h-[60px] sm:h-[70px] md:h-[80px] lg:h-[110px]
//                   flex items-center
//                 "
//               >
//                 <span className="block">{display}</span>

//                 {/* blinking cursor */}
//                 <span className="inline-block ml-1">
//                   <span className="inline-block w-[3px] h-6 md:h-7 lg:h-9 bg-brandGreen rounded animate-pulse"></span>
//                 </span>
//               </h1>

//               {/* DESCRIPTION */}
//               <p
//                 className="
//                   text-brandGreen sm:mt-6 md:mt-8
//                   text-[13px] sm:text-[15px] md:text-[15px] lg:text-[18px]
//                   leading-relaxed md:leading-relaxed lg:leading-loose
//                   h-[90px] sm:h-[120px] md:h-[130px] lg:h-[150px]
//                   overflow-hidden
//                 "
//               >
//                 মানিকগঞ্জের প্রতিটি মানুষের চাওয়াই আমার চাওয়া। আমাকে জানান আপনাদের মনের দাবিগুলো, 
//                 আমি আমার সর্বোচ্চ দিয়ে সেগুলো পূরণের চেষ্টা করবো।
//               </p>

//               {/* Button */}
//               <div className="text-center md:text-left ">
//                 <Link href="/nari-shakti">
//                 <button className="w-auto md:min-w-24 text-center rounded bg-brandYellow text-white px-6 py-2 font-semibold hover:bg-brandGreen transition">
//                   Register Now
//                 </button>
//                 </Link>
//               </div>

//             </div>
//           </div>

//           {/* Right Slider Section */}
//           <div className="w-full md:w-7/12 relative shadow-l mb-5 ">
//             <div className="relative h-[200px] md:h-[322px] overflow-hidden shadow-xl md:-ml-6 md:mt-7">
//               <Swiper
//                 spaceBetween={0}
//                 slidesPerView={1}
//                 loop={true}
//                 autoplay={{
//                   delay: 3000,
//                   disableOnInteraction: false,
//                 }}
//                 modules={[Autoplay]}
//                 className="w-full h-full"
//               >
//                 <SwiperSlide>
//                   <div className="w-full h-full relative">
//                     <Image
//                       src="/carousel1.jpeg"
//                       alt="Slide 1"
//                       width="1500"
//                       height="1500"
//                       className="object-cover"
//                       priority
//                     />
//                   </div>
//                 </SwiperSlide>

//                 <SwiperSlide>
//                   <div className="w-full h-full relative">
//                     <Image
//                       src="/carousel2.jpeg"
//                       alt="Slide 2"
//                       width="1500"
//                       height="1500"
//                       className="object-cover"
//                       priority
//                     />
//                   </div>
//                 </SwiperSlide>

//                 <SwiperSlide>
//                   <div className="w-full h-full relative">
//                     <Image
//                       src="/carousel3.jpeg"
//                       alt="Slide 3"
//                       width="1800"
//                       height="1800"
//                       className="object-cover"
//                       priority
//                     />
//                   </div>
//                 </SwiperSlide>

//               </Swiper>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }



'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Image from 'next/image'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

export default function HeroSlider() {
  /* ================= Left Text (from API) ================= */
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [display, setDisplay] = useState('')

  /* ================= Right Slider ================= */
  const [sliders, setSliders] = useState([])
  const [loadingSlider, setLoadingSlider] = useState(true)

  /* -------- Fetch introduction (LEFT) -------- */
  useEffect(() => {
    if (!API_BASE) return

    const fetchIntro = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/introductions`)
        const result = await res.json()

        if (result.success && result.data?.length > 0) {
          setTitle(result.data[0].title)
          setDescription(result.data[0].description)
        }
      } catch (err) {
        console.error('Introduction load failed', err)
      }
    }

    fetchIntro()
  }, [])

  /* -------- Typing effect (UNCHANGED logic) -------- */
  useEffect(() => {
    let timer
    if (display.length < title.length) {
      timer = setTimeout(
        () => setDisplay(title.slice(0, display.length + 1)),
        70
      )
    }
    return () => clearTimeout(timer)
  }, [display, title])

  /* -------- Fetch sliders (RIGHT) -------- */
  useEffect(() => {
    if (!API_BASE) return

    const fetchSliders = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/sliders`)
        const result = await res.json()
        setSliders(result.data || [])
      } catch (err) {
        console.error('Slider load failed', err)
        setSliders([])
      } finally {
        setLoadingSlider(false)
      }
    }

    fetchSliders()
  }, [])

  return (
    <section className="w-full bg-white mt-5 shadow-sm">
      <div className="w-full px-0 md:px-10 py-0">
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6">

          {/* ================= LEFT TEXT (API) ================= */}
          <div className="w-full md:w-5/12 flex items-center justify-center md:justify-start px-4 md:h-[450px]">
            <div className="w-full flex flex-col justify-center h-full min-h-[30px]">

              <h1
                className="
                  text-[18px] sm:text-[22px] md:text-[26px] lg:text-[36px]
                  font-semibold text-brandGreen leading-snug 
                  md:leading-snug lg:leading-tight
                  h-[60px] sm:h-[70px] md:h-[80px] lg:h-[110px]
                  flex items-center
                "
              >
                <span className="block">{display}</span>
                <span className="inline-block ml-1">
                  <span className="inline-block w-[3px] h-6 md:h-7 lg:h-9 bg-brandGreen rounded animate-pulse"></span>
                </span>
              </h1>

              <p
                className="
                  text-brandGreen sm:mt-6 md:mt-8
                  text-[13px] sm:text-[15px] md:text-[15px] lg:text-[18px]
                  leading-relaxed md:leading-relaxed lg:leading-loose
                  h-[90px] sm:h-[120px] md:h-[130px] lg:h-[150px]
                  overflow-hidden
                "
              >
                {description}
              </p>

              <div className="text-center md:text-left">
                <Link href="/nari-shakti">
                  <button className="w-auto md:min-w-24 rounded bg-brandYellow text-white px-6 py-2 font-semibold hover:bg-brandGreen transition">
                    Register Now
                  </button>
                </Link>
              </div>

            </div>
          </div>

          {/* ================= RIGHT SLIDER (API) ================= */}
          <div className="w-full md:w-7/12 relative shadow-l mb-5">
            <div className="relative h-[200px] md:h-[322px] overflow-hidden shadow-xl md:-ml-6 md:mt-7">

              {!loadingSlider && sliders.length > 0 && (
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  loop
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  className="w-full h-full"
                >
                  {sliders.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="w-full h-full relative">
                        <Image
                          src={item.image}
                          alt="Hero slider"
                          fill
                          className="object-cover"
                          priority
                          unoptimized
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
