// components/UpdatesSection.jsx
"use client";

import React from "react";
import Link from "next/link";

const noticeSample = {
  title: "সচেতনতা সভা: আগামী ৩০ নভেম্বর, সকাল ১০টা — সকলকে অবহিত করা যাচ্ছে",
  date: "2025-11-26",
  url: "/notice/1",
};

const eventSemple = [
  {
    id: 1,
    title: "রিতার উদ্যোগে গ্রামীণ বন্যা পুনর্বাসন কার্যক্রম শুরু",
    date: "২০২৫-১১-২০",
    url: "/news/1",
  },
  {
    id: 2,
    title: "শিক্ষা সহায়তা প্যাকেজ বিতরণ করলেন রিতা",
    date: "২০২৫-১১-১২",
    url: "/news/2",
  },
  {
    id: 3,
    title: "স্থানীয় রাস্তা সংস্কার উদ্বোধন",
    date: "২০২৫-১০-৩০",
    url: "/news/3",
  },
  {
    id: 4,
    title: "স্বাস্থ্য সেবা ক্যাম্পে অংশগ্রহণ করলেন রিতা",
    date: "২০২৫-১০-১৫",
    url: "/news/4",
  },
  {
    id: 5,
    title: "গ্রামীণ নারীদের জন্য দক্ষতা উন্নয়ন কর্মশালা",
    date: "২০২৫-১০-০৫",
    url: "/news/5",
  },
];



export default function UpdatesSection() {
  return (
    <section className="w-full bg-white py-8 ">
      <div className="max-w-7xl mx-auto">

        {/* NOTICE (Top) */}
        <div className="mb-6 shadow-lg">
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
        <div className="grid">
          {/* Left: News */}
          <div>
            <div className="flex  mb-3">
              <h4 className="text-green-600 text-lg font-semibold">আসন্ন ইভেন্ট (Upcomming Event)</h4>
             
            </div>

            <div className="bg-white border border-gray-100 rounded-lg shadow-xl divide-y divide-gray-100">
              {eventSemple.map((n) => (
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
          
        </div>

      </div>
    </section>
  );
}
