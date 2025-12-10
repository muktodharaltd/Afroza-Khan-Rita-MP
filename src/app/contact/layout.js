import Navber from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata = {
  title: "আফরোজা খানম রিতা",
  description: "সমর্থন বা অভিযোগের জন্য অফিসে যোগাযোগের বিস্তারিত ও অনলাইন ফর্ম।",
}

export default function ContactLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brandGray">
      <Navber />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

