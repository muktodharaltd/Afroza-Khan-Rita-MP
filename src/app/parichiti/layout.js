import Navber from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata = {
  title: "আফরোজা খানম রিতা",
  description:
    "আফরোজা খানম রিতার পরিচিতি, মূল উদ্দেশ্য, এবং জনগণের জন্য নেওয়া উদ্যোগগুলোর সারসংক্ষেপ।",
}

export default function ParichitiLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdf6] text-brandGray">
      <Navber />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

