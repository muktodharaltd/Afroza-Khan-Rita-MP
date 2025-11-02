'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';

const HeroSlider = () => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="w-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-[205px] sm:h-[250px] md:h-[400px] lg:h-[500px]">
            <Image
              src="/carousel1.jpg"
              alt="Slide 1"
              fill
              className="object-cover"
              priority
            />
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-[205px] sm:h-[250px] md:h-[400px] lg:h-[500px]">
            <Image
              src="/carousel2.jpg"
              alt="Slide 2"
              fill
              className="object-cover"
              priority
            />
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-[205px] sm:h-[250px] md:h-[400px] lg:h-[500px]">
            <Image
              src="/carousel3.jpg"
              alt="Slide 3"
              fill
              className="object-cover"
              priority
            />
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Optional Form */}
      
    </div>
  );
};

export default HeroSlider;
