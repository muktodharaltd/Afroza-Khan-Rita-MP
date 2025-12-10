import NewsPage from "@/components/news/newsPaga"

import Galary from "@/components/galary/galary"
import Image from "next/image"

const highlightData = [
  {
    title: "জনসেবা ও যোগাযোগ",
    description:
      "গ্রামে-শহরে সাধারণ মানুষের সমস্যা শোনার জন্য নিয়মিত শোনা সেবা কেন্দ্র এবং ত্রাতা চাইলে সরাসরি অফিসে যোগাযোগের ব্যবস্থা রাখা হয়েছে।",
  },
  {
    title: "স্বচ্ছ উন্নয়ন উদ্যোগ",
    description:
      "সড়ক, পানীয় জল, শিক্ষা ও স্বাস্থ্য খাতে পরিকল্পিত বাজেট বরাদ্দ ও প্রকল্প বাস্তবায়নের উপর নজর রাখা হয়।",
  },
  {
    title: "নারী ও যুব উন্নয়ন",
    description:
      "নারীদের অর্থনৈতিক সক্ষমতা ও যুবকদের কুশলতা বাড়াতে ট্রেনিং, উদ্যোক্তা সাহায্য এবং ডিজিটাল ক্লাব চালু করা হয়।",
  },
]

const missionPoints = [
  "গ্রামের প্রত্যেকটি পরিবারকে প্রবাসী ও স্থানীয় অংশীদারদের সহযোগিতায় উন্নয়ন অবকাঠামোর সাথে যুক্ত করা।",
  "আরো টেকসই স্বাস্থ্যকেন্দ্র এবং শিক্ষার সুযোগ তৈরি করে প্রত্যেক শিশুকে পাঠশালায় ফেরানো।",
  "নারী ও বয়স্কদের জন্য নিরাপদ পরিবহন, প্রশিক্ষণ ও সমাজসচেতনতার মাধ্যমে আত্মনির্ভরতার পথ সুগম করা।",
]

export default function ParichitiPage() {
  return (
    <div className="space-y-12">
      <section className="bg-gradient-to-r from-brandGreen/20 via-white to-brandYellow/30 px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
    <div className="flex flex-col-reverse md:flex-row items-center justify-around">

  {/* Text */}
  <h1 className="text-4xl md:text-5xl font-bold text-brandGreen mt-4 md:mt-0 text-center md:text-left">
    আফরোজা খানম রিতা
  </h1>

  {/* Image */}
  <Image
    src="/22.png"
    alt=""
    height={200}
    width={200}
  />

</div>

          <p className="text-base md:text-lg text-brandGray mt-4 leading-relaxed">
            শ্রদ্ধেয় হারুনার রশিদ খান মুন্নু'র কন্যা আফরোজা খানম রিতা একজন বিশিষ্ট বাংলাদেশী রাজনৈতিক ব্যক্তিত্ব এবং বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি)-এর উচ্চপদস্থ নেত্রী। বর্তমানে তিনি বিএনপি চেয়ারপারসনের উপদেষ্টা পরিষদের সদস্য এবং মানিকগঞ্জ জেলা বিএনপি ইউনিটের আহ্বায়ক হিসেবে দায়িত্ব পালন করছেন। এছাড়াও তিনি আগামী জাতীয় নির্বাচন ২০২৬-এ মানিকগঞ্জ ৩ আসনের বিএনপি মনোনীত প্রার্থী।
          </p>
          <p className="text-sm text-brandGray mt-2">
           তিনি জনসেবা, উন্নয়ন, নারী ক্ষমতায়ন ও তরুণদের দক্ষতা বাড়ানোর মাধ্যমে নতুন করে একটি আত্মবিশ্বাসী কমিউনিটি গড়ে তোলার জন্য অক্লান্ত কাজ করে যাচ্ছেন।
          </p>
        </div>
      </section>

      <section className="px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {highlightData.map((item) => (
              <div
                key={item.title}
                className="bg-white shadow-lg rounded-2xl p-6 border border-brandGreen/30"
              >
                <h3 className="text-xl font-semibold text-brandGreen mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-brandGray leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white shadow-md border border-brandGray/30 rounded-2xl p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-brandGreen">মিশন</h2>
            <ul className="list-disc list-inside space-y-2 text-brandGray">
              {missionPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <NewsPage />
         
          <Galary />
        </div>
      </section>
    </div>
  )
}

