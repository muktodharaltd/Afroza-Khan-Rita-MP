// components/UpdatesSection.jsx
"use client";

import React from "react";
import Link from "next/link";

// 🔔 Top Main Notice
const noticeSample = {
  title: "নারী সুরক্ষা সচেতনতা সভা: ১৫ ডিসেম্বর সকাল ১০টায় অনুষ্ঠিত হবে",
  date: "১৫ ডিসেম্বর ২০২৫",
  url: "/notice/1",
};

// 📅 LEFT — Event List
const eventSample = [
  {
    id: 1,
    title: "গ্রামীণ রাস্তা সংস্কার কার্যক্রম শুরু",
    date: "২০ ডিসেম্বর ২০২৫",
    url: "/event/1",
  },
  {
    id: 2,
    title: "বন্যা পুনর্বাসন সহায়তা বিতরণ",
    date: "১৮ ডিসেম্বর ২০২৫",
    url: "/event/2",
  },
  {
    id: 3,
    title: "স্বাস্থ্যসেবা ক্যাম্প – বিনামূল্যে চেকআপ",
    date: "১৬ ডিসেম্বর ২০২৫",
    url: "/event/3",
  },
];

// 👩‍🦰 RIGHT — Women Focused Notices
const womenNoticeList = [
  {
    id: 1,
    title: "নারী উদ্যোক্তা প্রশিক্ষণ কর্মশালার নিবন্ধন শুরু",
    date: "১৪ ডিসেম্বর ২০২৫",
    url: "/women/1",
  },
  {
    id: 2,
    title: "নারী প্রকল্পের নতুন ব্যাচে ভর্তি চলছে",
    date: "১০ ডিসেম্বর ২০২৫",
    url: "/women/2",
  },
  {
    id: 3,
    title: "নারীদের জন্য বিনামূল্যে ডিজিটাল স্কিল ট্রেনিং",
    date: "৫ ডিসেম্বর ২০২৫",
    url: "/women/3",
  },
];

export default function UpdatesSection() {
  return (
    <section className="w-full bg-white py-8 shadow-sm">
      <div className="max-w-7xl mx-auto">

        {/* 🔔 MAIN TOP NOTICE */}
        <div className="mb-6 shadow-lg">
          <div className="rounded-lg bg-green-50 border border-green-200 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-green-700 font-semibold text-lg">{noticeSample.title}</h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-green-600">{noticeSample.date}</div>
              <Link
                href={noticeSample.url}
                className="inline-block px-3 py-1 bg-green-600 text-white rounded-md text-sm font-semibold hover:brightness-95"
              >
                বিস্তারিত
              </Link>
            </div>
          </div>
        </div>

        {/* 🔻 TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* 📅 LEFT — Upcoming Events */}
          <div>
            <h4 className="text-green-700 text-lg font-semibold mb-3">
              আসন্ন ইভেন্ট (Upcoming Events)
            </h4>

            <div className="bg-white border border-gray-200 rounded-lg shadow divide-y divide-gray-100">
              {eventSample.map((e) => (
                <article key={e.id} className="p-4 flex items-start gap-3">
                  <div className="flex-1">
                    <Link href={e.url}>
                      <h5 className="text-green-700 font-medium hover:underline">
                        {e.title}
                      </h5>
                    </Link>
                    <div className="text-xs text-green-600 mt-1">{e.date}</div>
                  </div>
                  <div className="self-start">
                    <Link href={e.url} className="text-sm text-green-600 hover:underline">
                      পড়ুন
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 👩‍🦰 RIGHT — Women Focused Notices */}
          <div>
            <h3 className="text-pink-700 font-bold text-lg mb-2">
              নারী বিষয়ক বিজ্ঞপ্তি (Women Notices)
            </h3>

            

            <div className="bg-white border border-gray-200 rounded-lg shadow divide-y divide-gray-100">
              {womenNoticeList.map((n) => (
                <article key={n.id} className="p-4 flex items-start gap-3">
                  <div className="flex-1">
                    <Link href={n.url}>
                      <h5 className="text-pink-700 font-medium hover:underline">
                        {n.title}
                      </h5>
                    </Link>
                    <div className="text-xs text-pink-600 mt-1">{n.date}</div>
                  </div>
                  <div className="self-start">
                    <Link href={n.url} className="text-sm text-pink-700 hover:underline">
                      পড়ুন
                    </Link>
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
