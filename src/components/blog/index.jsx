"use client";
import React from "react";
import Image from "next/image";
import BlogData from "./blogData.json";

const BlogPosts = () => {
  return (
    <section className="py-12 bg-sky-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
         সাম্প্রতিক ব্লগ পোস্ট
        </h2>

        <div className="flex flex-wrap -mx-4">
          {BlogData.map((post) => (
            <div key={post.id} className="w-full md:w-1/2 px-4 mb-8">
              <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                
                {/* Left Side: Image + Short Title */}
                <div className="md:w-1/3 bg-gray-50 flex flex-col items-center p-4">
                  <div className="w-full h-48 relative mb-3">
                    <Image
                      src={post.img}
                      alt={post.title || post.shortTitle || "Blog Image"}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                    />
                  </div>
                  {post.shortTitle && (
                    <h4 className="text-sm font-semibold text-gray-600 text-center md:text-left">
                      {post.shortTitle}
                    </h4>
                  )}
                </div>

                {/* Right Side: Big Title + Description + Read More */}
                <div className="md:w-2/3 p-6 flex flex-col justify-center">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {post.description}
                    <span className="underline cursor-pointer">Read more...</span>
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
