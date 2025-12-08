import Navber from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata = {
  title: "নারী শক্তি | Afroza Khan Rita",
  description:
    "নারী ক্ষমতায়ন, শিক্ষা ও স্বনির্ভরতার গল্প এবং উদ্যোগের বিস্তারিত ব্যাখ্যা।",
}

export default function NariShaktiLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4faf7] text-brandGray">
      <Navber />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

