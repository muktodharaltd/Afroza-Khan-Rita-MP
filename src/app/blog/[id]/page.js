'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

export default function BlogDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs`)
        const result = await res.json()

        console.log('All blogs:', result)

        // Find blog by id
        const found = result.data.find((b) => b.id === parseInt(id))
        setBlog(found || null)
      } catch (error) {
        console.error('Blog fetch error:', error)
        setBlog(null)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  if (loading) return <p className="ml-5 mt-5 text-gray-500">লোড হচ্ছে...</p>
  if (!blog) return <p className="ml-5 mt-5 text-red-500">Blog পাওয়া যায়নি</p>

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <meta property="og:image" content={blog?.image} />
      <meta property="og:image:secure_url" content={blog?.image} />
      <meta property="og:image:width" content="702" />
      <meta property="og:image:height" content="389" />
      <meta property="og:image:alt" content={blog.title} />
      <meta property="og:image:type" content="image/png" />
      <button
        onClick={() => router.back()}
        className="mb-5 text-brandGreen underline text-sm font-medium"
      >
        ← Back
      </button>

      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brandGreen">
        {blog.title}
      </h1>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-container rounded-md mb-6"
        />
      )}

      <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
        {blog.description}
      </p>
    </div>
  )
}

// 'use client'

// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   LinkedinShareButton,
//   FacebookIcon,
//   TwitterIcon,
//   LinkedinIcon,
// } from "react-share";

// const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL;

// export default function BlogDetail() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // current page url (client side only)
//   const shareUrl =
//     typeof window !== "undefined" ? window.location.href : "";

//   useEffect(() => {
//     if (!id) return;

//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/blogs`);
//         const result = await res.json();

//         const found = result.data.find(
//           (b) => b.id === parseInt(id)
//         );
//         setBlog(found || null);
//       } catch (error) {
//         console.error("Blog fetch error:", error);
//         setBlog(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(shareUrl);
//       alert("Link copied!");
//     } catch {
//       alert("Copy failed");
//     }
//   };

//   if (loading)
//     return <p className="ml-5 mt-5 text-gray-500">লোড হচ্ছে...</p>;

//   if (!blog)
//     return <p className="ml-5 mt-5 text-red-500">Blog পাওয়া যায়নি</p>;

//   return (
//     <div className="max-w-4xl mx-auto py-10 px-4">
//       <button
//         onClick={() => router.back()}
//         className="mb-5 text-brandGreen underline text-sm font-medium"
//       >
//         ← Back
//       </button>

//       <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brandGreen">
//         {blog.title}
//       </h1>

//       {blog.image && (
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="w-full rounded-md mb-6"
//         />
//       )}

//       <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
//         {blog.description}
//       </p>

//       {/* 🔗 SHARE SECTION */}
//       <div className="flex flex-wrap items-center gap-4 mt-10">
//         <span className="font-medium text-gray-700">
//           Share this blog:
//         </span>

//         <FacebookShareButton
//           url={shareUrl}
//           quote={blog.title}
//           hashtag="#blog"
//         >
//           <FacebookIcon size={40} round />
//         </FacebookShareButton>

//         <TwitterShareButton
//           url={shareUrl}
//           title={blog.title}
//         >
//           <TwitterIcon size={40} round />
//         </TwitterShareButton>

//         <LinkedinShareButton
//           url={shareUrl}
//           title={blog.title}
//           summary={blog.description}
//           source={shareUrl}
//         >
//           <LinkedinIcon size={40} round />
//         </LinkedinShareButton>

//         {/* 🔗 COPY LINK */}
//         <button
//           onClick={handleCopyLink}
//           className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100"
//         >
//           🔗 Copy Link
//         </button>
//       </div>
//     </div>
//   );
// }
