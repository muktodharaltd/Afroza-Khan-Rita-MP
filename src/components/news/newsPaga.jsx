



"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL;

export default function UpdatesSection() {
  const [events, setEvents] = useState([]);
  const [womenNotices, setWomenNotices] = useState([]);
  const [topNotice, setTopNotice] = useState(null);

  useEffect(() => {
    // 📅 Events
    fetch(`${API_BASE}/api/events`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setEvents(res.data || []);
          setTopNotice(res.data?.[0] || null); // first event as top notice
        }
      })
      .catch(console.error);

    // 👩‍🦰 Women Notices
    fetch(`${API_BASE}/api/woman-notices`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setWomenNotices(res.data || []);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section className="w-full bg-white py-8 shadow-sm">
      <div className="max-w-7xl mx-auto">

        {/* 🔔 MAIN TOP NOTICE */}
        {topNotice && (
          <div className="mb-6 shadow-lg">
            <div
              className="rounded-lg border border-brandGreen p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              style={{ backgroundColor: "rgba(13, 132, 72, 0.08)" }}
            >
              <div className="flex-1">
                <h3 className="text-brandGreen font-semibold text-lg">
                  {topNotice.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-brandGreen">
                  {new Date(topNotice.date).toLocaleDateString("bn-BD")}
                </div>
                <Link
                  href={`/event/${topNotice.id}`}
                  className="inline-block px-3 py-1 bg-brandGreen text-white rounded-md text-sm font-semibold hover:bg-brandGreen/90"
                >
                  বিস্তারিত
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 🔻 TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* 📅 LEFT — Upcoming Events */}
          <div>
            <h4 className="text-brandGreen text-lg font-semibold mb-3">
              আসন্ন ইভেন্ট (Upcoming Events)
            </h4>

            <div className="bg-white border border-brandGray rounded-lg shadow divide-y divide-brandGray">
              {events.map((e) => (
                <article key={e.id} className="p-4 flex items-start gap-3">
                  <div className="flex-1">
                    <Link href={`/event/${e.id}`}>
                      <h5 className="text-brandGreen font-medium hover:underline">
                        {e.title}
                      </h5>
                    </Link>
                    <div className="text-xs text-brandGreen mt-1">
                      {new Date(e.date).toLocaleDateString("bn-BD")}
                    </div>
                  </div>
                  <div className="self-start">
                    <Link
                      href={`/event/${e.id}`}
                      className="text-sm text-brandGreen hover:underline"
                    >
                      পড়ুন
                    </Link>
                  </div>
                </article>
              ))}

              {events.length === 0 && (
                <p className="p-4 text-sm text-brandGray">কোনো ইভেন্ট পাওয়া যায়নি</p>
              )}
            </div>
          </div>

          {/* 👩‍🦰 RIGHT — Women Notices */}
          <div>
            <h3 className="text-brandGreen font-bold text-lg mb-2">
              নারী বিষয়ক বিজ্ঞপ্তি (Women Notices)
            </h3>

            <div className="bg-white border border-brandGray rounded-lg shadow divide-y divide-brandGray">
              {womenNotices.map((n) => (
                <article key={n.id} className="p-4 flex items-start gap-3">
                  <div className="flex-1">
                    <Link href={`/women/${n.id}`}>
                      <h5 className="text-brandGreen font-medium hover:underline">
                        {n.title}
                      </h5>
                    </Link>
                    <div className="text-xs text-brandGreen mt-1">
                      {new Date(n.date).toLocaleDateString("bn-BD")}
                    </div>
                  </div>
                  <div className="self-start">
                    <Link
                      href={`/women/${n.id}`}
                      className="text-sm text-brandGreen hover:underline"
                    >
                      পড়ুন
                    </Link>
                  </div>
                </article>
              ))}

              {womenNotices.length === 0 && (
                <p className="p-4 text-sm text-brandGray">
                  কোনো নারী বিষয়ক বিজ্ঞপ্তি নেই
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
