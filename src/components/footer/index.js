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
//               <Link href="/" className="hover:text-yellow-400 transition">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="/about" className="hover:text-yellow-400 transition">
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link href="/services" className="hover:text-yellow-400 transition">
//                 Services
//               </Link>
//             </li>
//             <li>
//               <Link href="/contact" className="hover:text-yellow-400 transition">
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


"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-red-700 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top: responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">

          {/* Branding - on small screens span 2 cols so other sections can share space compactly */}
          <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 relative flex-shrink-0 rounded-full overflow-hidden shadow-md">
                <Image
                  src="/logo.jpg"
                  alt="Afroza Khan Rita Logo"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-semibold leading-tight">Afroza Khan Rita</p>
                <p className="text-sm opacity-90">Member of Parliament</p>
              </div>
            </div>
            <p className="text-sm opacity-90">
              Dedicated to serving the people with integrity and development. Reach out for any community support.
            </p>
            <div className="flex gap-2 mt-2">
              <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-red-600 hover:bg-red-500 transition-shadow shadow-sm">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-red-600 hover:bg-red-500 transition-shadow shadow-sm">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-full bg-red-600 hover:bg-red-500 transition-shadow shadow-sm">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-full bg-red-600 hover:bg-red-500 transition-shadow shadow-sm">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links - single row with pipe separators */}
          <div className="text-sm">
            <h6 className="text-base font-semibold mb-2">Quick Links</h6>
            <nav className="flex items-center gap-2 whitespace-nowrap overflow-x-auto text-white">
              <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
              <span className="opacity-80">|</span>
              <Link href="/about" className="hover:text-yellow-300 transition">About</Link>
              <span className="opacity-80">|</span>
              <Link href="/services" className="hover:text-yellow-300 transition">Services</Link>
              <span className="opacity-80">|</span>
              <Link href="/contact" className="hover:text-yellow-300 transition">Contact</Link>
            </nav>
          </div>

          {/* Resources - single row with pipe separators */}
          <div className="text-sm">
            <h6 className="text-base font-semibold mb-2">Resources</h6>
            <nav className="flex items-center gap-2 whitespace-nowrap overflow-x-auto text-white">
              <Link href="#" className="hover:text-yellow-300 transition">News</Link>
              <span className="opacity-80">|</span>
              <Link href="#" className="hover:text-yellow-300 transition">Projects</Link>
              <span className="opacity-80">|</span>
              <Link href="#" className="hover:text-yellow-300 transition">Events</Link>
              <span className="opacity-80">|</span>
              <Link href="#" className="hover:text-yellow-300 transition">FAQ</Link>
            </nav>
          </div>

          {/* Contact - compact, brief info and small CTA */}
          <div className="text-sm">
            <h6 className="text-base font-semibold mb-2">Contact</h6>
            <p className="opacity-90">Office: 123, Parliament Rd, Dhaka</p>
            <p className="opacity-90 mt-1">Phone: +880 1234 567890</p>
            <p className="opacity-90 mt-1">Email: info@example.com</p>

            <div className="mt-3">
              <a href="/contact" className="inline-block px-3 py-1 bg-white text-red-700 font-semibold rounded-md shadow-sm hover:shadow transition text-sm">Contact Office</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-red-600 mt-6 pt-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-sm opacity-90">© {new Date().getFullYear()} Developed by <span className="font-semibold">Muktodhara Technology Limited</span></div>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/" className="text-white hover:text-yellow-300 transition">Privacy</Link>
              <Link href="/" className="text-white hover:text-yellow-300 transition">Terms</Link>
              <Link href="/" className="text-white hover:text-yellow-300 transition">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
