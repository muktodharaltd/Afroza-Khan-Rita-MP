

"use client";

import React, { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL;

export default function BlogPosts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!API_BASE) return;

    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs`);
        const result = await res.json();
        setBlogs(result?.data || []);
      } catch (error) {
        console.error("Blog fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const toggleDescription = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-8 ml-5 text-brandGreen">
        সাম্প্রতিক ব্লগ পোস্ট
      </h2>

      {loading && <p className="ml-5">লোড হচ্ছে...</p>}

      <div className="flex flex-wrap gap-y-8">
        {blogs.map((post) => {
          const isExpanded = expandedId === post.id;

          return (
            <div key={post.id} className="w-full md:w-1/2 px-4">
              <div
                className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden gap-5"
                style={{ backgroundColor: "rgba(84, 84, 84, 0.08)" }}
              >
                {/* Image */}
                <div className="md:w-1/3 p-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>

                {/* Content */}
                <div className="md:w-2/3 p-6">
                  <h2 className="text-lg md:text-xl font-bold text-brandGray mb-3">
                    {post.title}
                  </h2>

                  <p
                    className={`text-brandGray mb-2 ${
                      isExpanded ? "" : "line-clamp-3"
                    }`}
                  >
                    {post.description}
                  </p>

                  <button
                    onClick={() => toggleDescription(post.id)}
                    className="text-brandGreen underline text-sm font-medium"
                  >
                    {isExpanded ? "Read less" : "Read more..."}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
