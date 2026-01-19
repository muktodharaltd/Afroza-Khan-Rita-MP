import Carousel from '@/components/carousel/index'
import Navber from '@/components/navbar/index'
import Contact from '@/components/contact/index'
import Footer from '@/components/footer'
import Video from '@/components/video/index'
import Blog from '@/components/blog/index'
import Report from '@/components/report/index'
import Galary from '@/components/galary/galary'
import Event from '@/components/event/event'
import NewsRoom from "@/components/news/index"

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <Contact />
      <Report />
      <Event />
      <NewsRoom />
      <Blog />
      <Galary />
      <Video />
    </div>
  )
}
