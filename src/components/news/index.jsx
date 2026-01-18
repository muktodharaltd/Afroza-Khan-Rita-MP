// "use client";

// import Image from "next/image";
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

// // 🔹 Data (API / JSON থেকে এভাবেই আসতে পারে)
// const postData = {
//   title: "React শেখা এখন আরও সহজ 🚀",
//   image: "https://yourwebsite.com/react-post.jpg",
//   url: "https://yourwebsite.com/blog/react",
// };

// export default function ShareComponent() {
//   const { title, image, url } = postData;

//   const copyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(url);
//       alert("Link copied! Instagram এ paste করো 📋");
//     } catch (err) {
//       alert("Copy failed ❌");
//     }
//   };

//   return (
//     <div className="border rounded-lg p-4 space-y-4 max-w-md">
      
//       {/* 🔹 Preview */}
//       <div className="flex gap-3 items-center">
//         <img
//           src={image}
//           alt={title}
//           width={80}
//           height={80}
//           className="rounded object-cover"
//         />
//         <h3 className="font-semibold text-sm">{title}</h3>
//       </div>

//       {/* 🔹 Share Buttons */}
//       <div className="flex gap-3 items-center">
//         <FacebookShareButton url={url} quote={title}>
//           <FacebookIcon size={36} round />
//         </FacebookShareButton>

//         <LinkedinShareButton url={url} title={title}>
//           <LinkedinIcon size={36} round />
//         </LinkedinShareButton>

//         <TwitterShareButton url={url} title={title}>
//           <TwitterIcon size={36} round />
//         </TwitterShareButton>

//         <WhatsappShareButton url={url} title={title}>
//           <WhatsappIcon size={36} round />
//         </WhatsappShareButton>

//         {/* 🔹 Instagram workaround */}
//         <button
//           onClick={copyLink}
//           className="px-3 py-2 bg-pink-500 text-white rounded text-xs"
//         >
//           Instagram
//         </button>
//       </div>
//     </div>
//   );
// }

