import Carousel from '@/components/carousel/index'
import Navber from '@/components/navbar/index'
import Contact from '@/components/contact/index'
import Footer from '@/components/footer'
import Video from '@/components/video/index'
import Blog from '@/components/blog/index'
import Report from '@/components/report/index'
import Galary from '@/components/galary/galary'
import NewsPage from '@/components/news/newsPaga'

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <Contact />
      <Report />
      <NewsPage />
      <Galary />
      <Video />
      <Blog />
    </div>
  )
}
