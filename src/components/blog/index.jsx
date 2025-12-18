// "use client";
// import React from "react";
// import Image from "next/image";
// import BlogData from "./blogData.json";

// export default function BlogPosts  (){
//   return (
//     <div className="max-w-7xl mx-auto py-10 ">
//       <h2 className="text-3xl font-bold mb-8 ml-5 text-brandGreen">
//         সাম্প্রতিক ব্লগ পোস্ট 
//       </h2>
//       {/* flex gap added */}
//       <div className="flex flex-wrap  gap-y-8">
//         {BlogData.map((post) => (
//           <div key={post.id} className="w-full md:w-1/2 px-4">
//             <div
//               className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden gap-5"
//               style={{ backgroundColor: "rgba(84, 84, 84, 0.08)" }}
//             >
              
//               {/* Left Side: Image + Short Title */}
//               <div className="md:w-1/3 flex flex-col items-center p-4">
//                 <div className="w-full h-48 relative mb-3">
//                   <Image
//                     src={post.img}
//                     alt={post.title || post.shortTitle || "Blog Image"}
//                     fill
//                     style={{ objectFit: "cover" }}
//                     className="rounded-md"
//                   />
//                 </div>
//                 {post.shortTitle && (
//                   <h4 className="text-sm font-semibold text-brandGreen text-center md:text-left">
//                     {post.shortTitle}
//                   </h4>
//                 )}
//               </div>

//               {/* Right Side: Big Title + Description + Read More  */}
//               <div className="md:w-2/3 p-6 flex flex-col justify-center">
//                 <h2 className="text-lg md:text-xl font-bold text-brandGray mb-3">
//                   {post.title}
//                 </h2>
//                 <p className="text-brandGray mb-4">
//                   {post.description}
//                   <span className="underline cursor-pointer">Read more...</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div> 
//     </div>
//   );
// };

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL;

export default function BlogPosts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!API_BASE) return;

    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs`);
        const result = await res.json();

        // Laravel / normal API both support
        setBlogs(result?.data || result || []);
      } catch (error) {
        console.error("Blog fetch error:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);


  return (
    <div className="max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-8 ml-5 text-brandGreen">
        সাম্প্রতিক ব্লগ পোস্ট
      </h2>

      {/* Loading */}
      {loading && (
        <p className="ml-5 text-gray-500">লোড হচ্ছে...</p>
      )}

      {/* Empty */}
      {!loading && blogs.length === 0 && (
        <p className="ml-5 text-red-500">কোনো ব্লগ পাওয়া যায়নি</p>
      )}

      <div className="flex flex-wrap gap-y-8">
        {blogs.map((post) => (
          <div key={post.id} className="w-full md:w-1/2 px-4">
            <div
              className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden gap-5"
              style={{ backgroundColor: "rgba(84, 84, 84, 0.08)" }}
            >
              {/* Left Side: Image */}
              <div className="md:w-1/3 flex flex-col items-center p-4">
                <div className="w-full h-48 relative mb-3 rounded-md overflow-hidden">
            <img
  src={post.image}
  alt={post.title}
  className="w-full h-48 object-cover rounded-md"
/>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="md:w-2/3 p-6 flex flex-col justify-center">
                <h2 className="text-lg md:text-xl font-bold text-brandGray mb-3">
                  {post.title}
                </h2>

                <p className="text-brandGray mb-4 line-clamp-3">
                  {post.description}
                  <span className="underline cursor-pointer ml-1">
                    Read more...
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
