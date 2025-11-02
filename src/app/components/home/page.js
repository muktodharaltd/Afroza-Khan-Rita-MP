
import Carousel from "./carousel";
import Navber from "@/components/navbar/index";

import Contact from "@/components/contact/index";
import Footer from "@/components/footer";
import Video from "@/components/video/index";
import Blog from "@/components/blog/index"




export default function HomePage (){
    return(
        <div>
        <Navber/>
            <Carousel/>
            <Contact/>
            <Video/>
            <Blog/>
            <Footer/>
         

        </div>
    )
}