
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NewsPage from "@/components/news/newsPaga";
import Galary from "@/components/galary/galary";

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL;

export default function ParichitiPage() {
  const [hero, setHero] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [missionPoints, setMissionPoints] = useState([]);

  useEffect(() => {
    // Hero Section
    const fetchHero = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/hero-sections`);
        const result = await res.json();
        if (result.success && result.data.length > 0) setHero(result.data[0]);
      } catch (err) {
        console.error("Hero load failed", err);
      }
    };

    // About / Highlights
    const fetchHighlights = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/abouts`);
        const result = await res.json();
        if (result.success && result.data.length > 0) {
          // Filter highlights (assuming title != "মিশন")
          const highlightItems = result.data.filter(
            (item) => item.title !== "মিশন"
          );
          setHighlights(highlightItems);

          // Mission subjects
          const mission = result.data.find((item) => item.title === "মিশন");
          if (mission?.subjects) setMissionPoints(mission.subjects);
        }
      } catch (err) {
        console.error("Highlights load failed", err);
      }
    };

    fetchHero();
    fetchHighlights();
  }, []);

  return (
    <div className="space-y-12">

      {/* Hero Section */}
      {hero && (
        <section className="bg-gradient-to-r from-brandGreen/20 via-white to-brandYellow/30 px-4 py-12">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-col-reverse md:flex-row items-center justify-around">
              {/* Text */}
              <h1 className="text-4xl md:text-5xl font-bold text-brandGreen mt-4 md:mt-0 text-center md:text-left">
                {hero.name}
              </h1>

              {/* Image */}
              <img
                src={hero.image}
                alt={hero.name}
                className="w-48 h-48 object-cover rounded-full"
              />
            </div>

            <p className="text-base md:text-lg text-brandGray mt-4 leading-relaxed">
              {hero.description}
            </p>
          </div>
        </section>
      )}

      {/* Highlights + Mission */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4">
              {highlights.map((item) => (
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
          )}

          {/* Mission */}
          {missionPoints.length > 0 && (
            <div className="bg-white shadow-md border border-brandGray/30 rounded-2xl p-6 space-y-3">
              <h2 className="text-2xl font-semibold text-brandGreen">মিশন</h2>
              <ul className="list-disc list-inside space-y-2 text-brandGray">
                {missionPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </section>

      {/* News & Gallery */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <NewsPage />
          <Galary />
        </div>
      </section>
    </div>
  );
}
