// components/UpdatesSection.jsx
"use client";

import React from "react";
import Link from "next/link";

const noticeSample = {
  title: "সচেতনতা সভা: আগামী ৩০ নভেম্বর, সকাল ১০টা — সকলকে অবহিত করা যাচ্ছে",
  date: "2025-11-26",
  url: "/notice/1",
};

const newsSample = [
  { id: 1, title: " রিতার উদ্যোগে গ্রামীণ বন্যা পুনর্বাসন কার্যক্রম শুরু", date: "2025-11-20", url: "/news/1" },
  { id: 2, title: "শিক্ষা সহায়তা প্যাকেজ বিতরণ করলেন  রিতা", date: "2025-11-12", url: "/news/2" },
  { id: 3, title: "স্থানীয় রাস্তা সংস্কার উদ্বোধন", date: "2025-10-30", url: "/news/3" },
];

const eventsSample = [
  { id: 1, title: "কমিউনিটি হেলথ ক্যাম্প — নিবন্ধন চলছে (২৫ নবেম্বর)", date: "2025-11-25", url: "/events/1" },
  { id: 2, title: "নারী ক্ষমতায়ন কর্মশালা —  রিতার নেতৃত্বে", date: "2025-12-02", url: "/events/2" },
  { id: 3, title: "থানা পর্যায়ে জনগণসংযোগ — অংশগ্রহণ নিশ্চিত করুন", date: "2025-12-10", url: "/events/3" },
];

export default function UpdatesSection() {
  return (
    <section className="w-full bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* NOTICE (Top) */}
        <div className="mb-6">
          <div className="rounded-lg bg-green-50 border border-green-200 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-green-600 font-bold text-lg md:text-xl">বিজ্ঞপ্তি (Notice)</h3>
              <p className="text-green-600 mt-2 text-sm md:text-base leading-relaxed">
                <Link href={noticeSample.url} className="hover:underline">
                  {noticeSample.title}
                </Link>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-green-600">{noticeSample.date}</div>
              <Link href={noticeSample.url} className="inline-block px-3 py-1 bg-green-600 text-white rounded-md text-sm font-semibold hover:brightness-95">
                বিস্তারিত
              </Link>
            </div>
          </div>
        </div>

        {/* NEWS & EVENTS (Bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: News */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-green-600 text-lg font-semibold"> রিতার সংবাদ (Recent News)</h4>
              <Link href="/news" className="text-sm text-green-600 hover:underline">সব সংবাদ</Link>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg shadow-sm divide-y divide-gray-100">
              {newsSample.map((n) => (
                <article key={n.id} className="p-4 flex items-start gap-3">
                  <div className="flex-1">
                    <Link href={n.url} className="block">
                      <h5 className="text-green-600 font-medium">{n.title}</h5>
                    </Link>
                    <div className="text-xs text-green-600 mt-1">{n.date}</div>
                  </div>
                  <div className="self-start">
                    <Link href={n.url} className="text-sm text-green-600 hover:underline">পড়ুন</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right: Events */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-green-600 text-lg font-semibold">আলোচ্য ইভেন্ট (Events)</h4>
              <Link href="/events" className="text-sm text-green-600 hover:underline">সব ইভেন্ট</Link>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg shadow-sm divide-y divide-gray-100">
              {eventsSample.map((e) => (
                <article key={e.id} className="p-4 flex items-start gap-3">
                  <div className="flex-1">
                    <Link href={e.url} className="block">
                      <h5 className="text-green-600 font-medium">{e.title}</h5>
                    </Link>
                    <div className="text-xs text-green-600 mt-1">{e.date}</div>
                  </div>
                  <div className="self-start">
                    <Link href={e.url} className="text-sm text-green-600 hover:underline">বিস্তারিত</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
