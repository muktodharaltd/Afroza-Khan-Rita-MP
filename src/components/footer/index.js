// "use client";
// import React from "react";
// import Link from "next/link";
// import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
// import Image from "next/image";

// const Footer = () => {
//   return (
//     <footer className="bg-red-500 text-gray-300 py-4 px-6">
//       {/* Top Section */}
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

//         {/* Branding */}
//         <div className="flex flex-col items-start space-y-3 md:w-1/3">
//           <div className="flex items-center gap-3">
//             <Image src="/logo.jpg" alt="logo" width={60} height={60} className="rounded-full" />
//             <div>
//               <p className="text-xl font-semibold text-white">Afroza Khan Rita</p>
//               <p className="text-sm text-white">Member of Parliament</p>
//             </div>
//           </div>
//           <p className="text-sm text-white max-w-xs">
//             Dedicated to serving the people with integrity and development.
//           </p>
//         </div>

//         {/* Navigation Links */}
//         <div className="md:w-1/3">
//           <h6 className="text-lg font-semibold text-white mb-4">Quick Links</h6>
//           <ul className="space-y-2 text-white">
//             <li>
//               <Link href="/" className="hover:text-brandYellow transition">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="/about" className="hover:text-brandYellow transition">
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link href="/services" className="hover:text-brandYellow transition">
//                 Services
//               </Link>
//             </li>
//             <li>
//               <Link href="/contact" className="hover:text-brandYellow transition">
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Social Links */}
//         <div className="md:w-1/3">
//           <h6 className="text-lg font-semibold text-white mb-4">Follow Us</h6>
//           <div className="flex space-x-5 text-green-600 text-2xl">
//             <Link href="#"><FaFacebook className="hover:text-white transition" /></Link>
//             <Link href="#"><FaInstagram className="hover:text-white transition" /></Link>
//             <Link href="#"><FaTwitter className="hover:text-white transition" /></Link>
//             <Link href="#"><FaLinkedin className="hover:text-white transition" /></Link>
//           </div>
//         </div>
//       </div>

//       {/* Divider */}
//       <hr className="my-4 border-gray-700" />

//       {/* Footer Bottom */}
//       <div className="text-center text-sm text-white">
//         © {new Date().getFullYear()} Developed by{" "}
//         <span className="text-white font-semibold">
//           Muktodhara Technology Limited
//         </span>

//       </div>
//     </footer>
//   );
// };

// export default Footer;

'use client'

import React from 'react'
import Link from 'next/link'
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
} from 'react-icons/fa'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-brandGreen text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top: responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
          {/* Branding - on small screens span 2 cols so other sections can share space compactly */}
          <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 relative flex-shrink-0 rounded-full overflow-hidden shadow-md">
                <Image
                  src="/logo.png"
                  alt="Afroza Khan Rita Logo"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-semibold leading-tight">
                  Afroza Khanam Rita
                </p>
              </div>
            </div>
            <p className=" text-white">
              আপনাদের যেকোনো সমস্যা ও চাওয়াগুলো এখানে জানান। আমি চেষ্টা করবো সেগুলোর বাস্তবমুখী সমাধানের চেষ্টা করবো।
            </p>

            <div className="flex gap-2 mt-2">
              <a
                href="https://www.facebook.com/afroza.rita.khanam"
                target="blank"
                className="p-2 rounded-full bg-brandYellow hover:bg-brandGray transition-all duration-500 transform hover:rotate-y-180 shadow-sm"
              >
                <FaFacebook />
              </a>

              <a
                href="https://www.tiktok.com/@afroza_khanam_rita"
                target="blank"
                className="p-2 rounded-full bg-brandYellow hover:bg-brandGray transition-all duration-500 transform hover:rotate-y-180 shadow-sm"
              >
                <FaTiktok />
              </a>

              <a
                href="https://x.com/AfrozaKRita"
                target="blank"
                className="p-2 rounded-full bg-brandYellow hover:bg-brandGray transition-all duration-500 transform hover:rotate-y-180 shadow-sm"
              >
                <FaTwitter />
              </a>

              <a
                href="https://www.linkedin.com/feed/"
                target="blank"
                className="p-2 rounded-full bg-brandYellow hover:bg-brandGray transition-all duration-500 transform hover:rotate-y-180 shadow-sm"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links - single row with pipe separators */}
          <div className="text-sm">
            <h6 className="text-base font-semibold mb-2">Quick Links</h6>
            <nav className="flex items-center gap-2 whitespace-nowrap overflow-x-auto text-white">
              <Link href="/" className="hover:text-brandYellow transition">
                Home
              </Link>
              <span className="opacity-80">|</span>
              <Link href="/about" className="hover:text-brandYellow transition">
                About
              </Link>
              <span className="opacity-80">|</span>
              <Link
                href="/services"
                className="hover:text-brandYellow transition"
              >
                Services
              </Link>
              <span className="opacity-80">|</span>
              <Link
                href="/contact"
                className="hover:text-brandYellow transition"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Resources - single row with pipe separators */}
          <div className="text-sm">
            <h6 className="text-base font-semibold mb-2">Resources</h6>
            <nav className="flex items-center gap-2 whitespace-nowrap overflow-x-auto text-white">
              <Link href="#" className="hover:text-brandYellow transition">
                News
              </Link>
              <span className="opacity-80">|</span>
              <Link href="#" className="hover:text-brandYellow transition">
                Projects
              </Link>
              <span className="opacity-80">|</span>
              <Link href="#" className="hover:text-brandYellow transition">
                Events
              </Link>
              <span className="opacity-80">|</span>
              <Link href="#" className="hover:text-brandYellow transition">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Contact - compact, brief info and small CTA */}
          <div className="text-sm">
            <p>ঠিকানা</p>
            <p>মুন্নু সিটি, গিলন্ড, মানিকগঞ্জ সদর, মানিকগঞ্জ-১৮০০</p>

            <div className="mt-3">
              <Link href="/contact">
                <button className="text-white px-3 py-1 bg-brandYellow hover:bg-brandGray font-semibold rounded-md shadow-sm hover:shadow transition text-sm">
                  Contact Office
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brandGreen mt-6 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-sm opacity-90">
              © {new Date().getFullYear()} Developed by{' '}
              <span className="font-semibold">
                Muktodhara Technology Limited
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link
                href="/"
                className="text-white hover:text-brandYellow transition"
              >
                Privacy
              </Link>
              <Link
                href="/"
                className="text-white hover:text-brandYellow transition"
              >
                Terms
              </Link>
              <Link
                href="/"
                className="text-white hover:text-brandYellow transition"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
