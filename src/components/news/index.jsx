// "use client";

// import {
//   FacebookShareButton,
//   LinkedinShareButton,
//   TwitterShareButton,
//   WhatsappShareButton,
//   FacebookIcon,
//   LinkedinIcon,
//   TwitterIcon,
//   WhatsappIcon,
// } from "react-share";

// // 🔹 Data (API / JSON থেকেও এমন আসতে পারে)
// const postData = [
//   {
//     title: "React শেখা এখন আরও সহজ 🚀",
//     image: "/blog1.jpg",
//     url: "https://afrozakhanamrita.com/blog/6",
//   },
//   {
//     title: "Next.js App Router গাইড",
//     image: "/blog1.jpg",
//     url: "https://afrozakhanamrita.com/blog/7",
//   },
//   {
//     title: "Tailwind CSS Tricks",
//     image: "/blog1.jpg",
//     url: "https://afrozakhanamrita.com/blog/8",
//   },
// ];

// export default function ShareComponent() {
//   const copyLink = async (url) => {
//     try {
//       await navigator.clipboard.writeText(url);
//       alert("Link copied! Instagram এ paste করো 📋");
//     } catch (err) {
//       alert("Copy failed ❌");
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {postData.map((post, index) => (
//         <div
//           key={index}
//           className="border rounded-lg p-4 space-y-4 max-w-md"
//         >
//           {/* 🔹 Preview */}
//           <div className="flex gap-3 items-center">
//             <img
//               src={post.image}
//               alt={post.title}
//               className="w-20 h-20 rounded object-cover"
//             />
//             <h3 className="font-semibold text-sm">{post.title}</h3>
//           </div>

//           {/* 🔹 Share Buttons */}
//           <div className="flex gap-3 items-center">
//             <FacebookShareButton url={post.url} quote={post.title}>
//               <FacebookIcon size={36} round />
//             </FacebookShareButton>

//             <LinkedinShareButton url={post.url} title={post.title}>
//               <LinkedinIcon size={36} round />
//             </LinkedinShareButton>

//             <TwitterShareButton url={post.url} title={post.title}>
//               <TwitterIcon size={36} round />
//             </TwitterShareButton>

//             <WhatsappShareButton url={post.url} title={post.title}>
//               <WhatsappIcon size={36} round />
//             </WhatsappShareButton>

//             {/* 🔹 Instagram workaround */}
//             <button
//               onClick={() => copyLink(post.url)}
//               className="px-3 py-2 bg-pink-500 text-white rounded text-xs"
//             >
//               Instagram
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



"use client";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

// 🔹 Data (API / JSON থেকেও আসতে পারে)
const postData = [
  {
    id: 6,
    title: "React শেখা এখন আরও সহজ 🚀",
    image: "/blog1.jpg",
    url: "https://afrozakhanamrita.com/blog/6",
    description: "React শেখার সহজ ও মজার উপায়।",
  },
  {
    id: 7,
    title: "Next.js App Router গাইড",
    image: "/blog2.jpg",
    url: "https://afrozakhanamrita.com/blog/7",
    description: "Next.js App Router নিয়ে step-by-step গাইড।",
  },
  {
    id: 8,
    title: "Tailwind CSS Tricks",
    image: "/blog3.jpg",
    url: "https://afrozakhanamrita.com/blog/8",
    description: "Tailwind CSS এ চমকপ্রদ ১০টি ট্রিক।",
  },
];

export default function ShareComponent() {
  const copyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied! Instagram এ paste করো 📋");
    } catch (err) {
      alert("Copy failed ❌");
    }
  };

  return (
    <div className="space-y-6">
      {postData.map((post) => (
        <div
          key={post.id}
          className="border rounded-lg p-4 space-y-4 max-w-md mx-auto"
        >
          {/* 🔹 Preview */}
          <div className="flex gap-3 items-center">
            <img
              src={post.image}
              alt={post.title}
              className="w-20 h-20 rounded object-cover"
            />
            <div>
              <h3 className="font-semibold text-sm">{post.title}</h3>
              <p className="text-xs text-gray-600">{post.description}</p>
            </div>
          </div>

          {/* 🔹 Share Buttons */}
          <div className="flex gap-3 items-center flex-wrap">
            <FacebookShareButton url={post.url} quote={post.title}>
              <FacebookIcon size={36} round />
            </FacebookShareButton>

            <LinkedinShareButton url={post.url} title={post.title} summary={post.description}>
              <LinkedinIcon size={36} round />
            </LinkedinShareButton>

            <TwitterShareButton url={post.url} title={post.title}>
              <TwitterIcon size={36} round />
            </TwitterShareButton>

            <WhatsappShareButton url={post.url} title={post.title}>
              <WhatsappIcon size={36} round />
            </WhatsappShareButton>

            {/* 🔹 Instagram workaround */}
            <button
              onClick={() => copyLink(post.url)}
              className="px-3 py-2 bg-pink-500 text-white rounded text-xs"
            >
              Instagram
            </button>
          </div>
        </div>
      ))}

      <p className="text-xs text-gray-500">
        💡 টিপস: Facebook preview ঠিকমতো দেখানোর জন্য প্রতিটি blog page এ **Open Graph meta tags** লাগবে। উদাহরণ:
      </p>
      
    </div>
  );
}
