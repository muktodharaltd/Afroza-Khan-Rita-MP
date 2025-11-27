'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Image from 'next/image'

const slogans = [
  'প্রতিটি নারীর স্বপ্ন পূরণের পাশে রিতা',
  'নারী উন্নয়নে নতুন দিগন্ত — রিতার নেতৃত্বে',
  'নারীকে সুযোগ দিলে—দেশ পায় সম্ভাবনা',
  'নারীর হাসিই উন্নয়নের আসল সাফল্য',
]

export default function HeroSlider() {
  const [index, setIndex] = useState(0) // which slogan
  const [display, setDisplay] = useState('') // current shown substring
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(70)

  useEffect(() => {
    let timer
    const fullText = slogans[index]

    if (!isDeleting) {
      // typing
      if (display.length < fullText.length) {
        timer = setTimeout(
          () => setDisplay(fullText.slice(0, display.length + 1)),
          speed
        )
      } else {
        // pause when fully typed
        timer = setTimeout(() => setIsDeleting(true), 1200)
      }
    } else {
      // deleting
      if (display.length > 0) {
        timer = setTimeout(
          () => setDisplay(fullText.slice(0, display.length - 1)),
          Math.max(30, speed / 1.6)
        )
      } else {
        // move to next
        setIsDeleting(false)
        setIndex((p) => (p + 1) % slogans.length)
      }
    }

    return () => clearTimeout(timer)
  }, [display, isDeleting, index, speed])

  // small randomness so typing looks natural each phrase
  useEffect(() => {
    setSpeed(60 + Math.floor(Math.random() * 40))
  }, [index])

  return (
    <section className="w-full bg-white mt-5">
      <div className="w-full px-0 py-0">
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6">
          {/* Left Text Section */}
          <div className="w-full md:w-5/12 flex items-center mt-10 h-30 justify-center md:justify-start px-4 md:ml-20">
            <div className="w-full">
              <h1 className="text-2xl h-10 sm:text-3xl md:text-4xl font-semibold text-green-600 leading-tight text-center md:text-left">
                <span>{display}</span>
                <span className="inline-block ml-2 align-middle">
                  <span
                    aria-hidden="true"
                    className="inline-block w-[3px] h-9 bg-green-600 rounded animate-pulse"
                  />
                </span>
              </h1>

              <p className="text-green-600 mt-15 text-base sm:text-xl md:text-2xl text-center md:text-left">
                আফরোজা খানম রিতা — নারী শক্তিকে এগিয়ে নেওয়ার দৃঢ় অঙ্গীকার
              </p>
            </div>
          </div>

          {/* Right Slider Section (mild overlap / mingle on desktop) */}
          <div className="w-full md:w-7/12 relative shadow-l">
            {/* To create a subtle 'mingle' effect on larger screens we shift the slider slightly left */}
            <div className="relative h-[220px] md:h-[420px]  overflow-hidden shadow-lg md:-ml-6">
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="w-full h-full"
              >
                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/carousel11.jpg"
                      alt="Slide 1"
                      width='1500'
                      height='1500'
                      className="object-cover "
                      priority
                    />
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/carousel22.jpg"
                      alt="Slide 2"
                      width='1500'
                      height='1500'
                      className="object-cover "
                      priority
                    />
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="w-full h-full relative">
                    <Image
                      src="/carousel33.jpg"
                      alt="Slide 3"
                      width='1500'
                      height='1500'
                      className="object-cover"
                      priority
                    />
                  </div>
                </SwiperSlide>
              </Swiper>

              {/* optional overlay gradient to help text readability if needed */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent to-white/60 md:to-white/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
