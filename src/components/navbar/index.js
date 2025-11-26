// "use client";

// import { useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import NavItem from "./menusData";
// import { GoChevronDown } from "react-icons/go";
// import { FaChevronRight } from "react-icons/fa6";

// import { FaFacebook } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import { usePathname } from "next/navigation";

// const Navbar = () => {
//   const pathname = usePathname();
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [hoveredSubItem, setHoveredSubItem] = useState(null);
//   const timeoutRef = useRef();
//   const [dropdownHeight, setDropdownHeight] = useState(0);

//   const handleMouseEnter = (name) => {
//     clearTimeout(timeoutRef.current);
//     setOpenDropdown(name);
//     setHoveredSubItem(null);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setOpenDropdown(null);
//       setHoveredSubItem(null);
//     }, 100);
//   };

//   return (
//     <>
//       {/* 🔸 Sticky Navbar */}
//       <div className="sticky top-0 uppercase font-semibold text-sm z-50 bg-red-600 shadow-md">
//         <div className="w-full mx-auto px-6 h-13 md:h-17 py-4 flex items-center justify-between">
//           {/* 🔹 Logo */}
//           <div className="flex items-center gap-2">
//             <div className="relative w-[50px] h-[50px]">
//               <Image
//                 src="/logo.jpg"
//                 alt="Logo"
//                 width={50}
//                 height={50}
//                 className="rounded-full object-cover"
//               />
//             </div>
//             <p className="text-base text-white md:text-lg ms:text-black">Afroza Khan Rita</p>
//           </div>

//           {/* 🟦 Desktop Menu */}
//           <ul className="hidden md:flex space-x-7 h-20 items-center">
//             {NavItem.map((item) => (
//               <li
//                 key={item.name}
//                 className="relative"
//                 onMouseEnter={() => handleMouseEnter(item.name)}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <Link
//                   href={item.href || "#"}
//                   className={`cursor-pointer select-none flex items-center gap-1 hover:text-sky-700 ${
//                     pathname === item.href ? "text-white" : ""
//                   }`}
//                 >
//                   <span>{item.name}</span>
//                   {item.dropdown && <GoChevronDown className="text-sm mt-[1px]" />}
//                 </Link>

//                 {/* spacer for dropdown hover zone */}
//                 <div className="absolute top-full left-0 w-full h-7"></div>

//                 <AnimatePresence>
//                   {openDropdown === item.name && item.dropdown && (
//                     <motion.ul
//                       initial={{ height: 0 }}
//                       animate={{
//                         height: dropdownHeight || "auto",
//                         transition: { duration: 0.2, ease: "easeOut" },
//                       }}
//                       exit={{
//                         height: 0,
//                         transition: { duration: 0, ease: "easeIn" },
//                       }}
//                       className={`mt-[24px] z-[9999] overflow-hidden ${
//                         item.dropdown.length > 7
//                           ? "absolute left-1/2 top-full -translate-x-1/2 bg-white shadow-xl border border-gray-300 grid grid-cols-2 gap-x-6 px-8 py-5 max-w-[700px] min-w-[500px]"
//                           : "absolute top-full left-0 bg-white shadow-xl border border-gray-300 flex flex-col w-auto px-4 py-2"
//                       }`}
//                     >
//                       {item.dropdown.map((subItem, index) => (
//                         <li key={subItem.name + index} className="relative">
//                           <Link
//                             href={subItem.href || "#"}
//                             className={`w-full min-w-[200px] font-mono text-sm py-2 px-4 whitespace-nowrap flex items-center justify-between duration-300 ${
//                               pathname === subItem.href
//                                 ? "text-white"
//                                 : "text-black hover:text-sky-900"
//                             }`}
//                           >
//                             <span>{subItem.name}</span>
//                             {subItem.dropdown && (
//                               <FaChevronRight className="text-sm mt-[1px]" />
//                             )}
//                           </Link>
//                         </li>
//                       ))}
//                     </motion.ul>
//                   )}
//                 </AnimatePresence>
//               </li>
//             ))}
//           </ul>

//           {/* 🟦 Desktop Button */}
//           <Link
//             href="/"
//             className=" bg-white text-blue rounded-full px-1 text-3xl py-1 hidden md:flex items-center gap-2"
//           >
//            <FaFacebook/>
//           </Link>

//           {/* 🟦 Mobile Menu Toggle */}
//           <div
//             className="md:hidden text-3xl cursor-pointer select-none"
//             onClick={() => setIsMobileMenuOpen(true)}
//           >
//             ☰
//           </div>
//         </div>
//       </div>

//       {/* 🔸 Mobile Menu Drawer */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-white shadow-2xl z-[99999] p-6 overflow-y-auto"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <p className="font-bold text-lg">Menu</p>
//               <IoMdClose
//                 className="text-3xl cursor-pointer"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               />
//             </div>

//             <ul className="flex flex-col space-y-3">
//               {NavItem.map((item, i) => (
//                 <li key={i}>
//                   <Link
//                     href={item.href || "#"}
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className={`block py-2 text-base ${
//                       pathname === item.href
//                         ? "text-sky-500"
//                         : "text-gray-700 hover:text-sky-500"
//                     }`}
//                   >
//                     {item.name}
//                   </Link>

//                   {item.dropdown && (
//                     <ul className="ml-4 border-l border-gray-200 pl-2">
//                       {item.dropdown.map((sub, j) => (
//                         <li key={j}>
//                           <Link
//                             href={sub.href || "#"}
//                             onClick={() => setIsMobileMenuOpen(false)}
//                             className={`block py-1 text-sm ${
//                               pathname === sub.href
//                                 ? "text-sky-500"
//                                 : "text-gray-600 hover:text-sky-500"
//                             }`}
//                           >
//                             {sub.name}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* 🔹 Background Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-[99998]"
//           onClick={() => setIsMobileMenuOpen(false)}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Navbar;



"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavItem from "./menusData";
import { GoChevronDown } from "react-icons/go";
import { FaChevronRight, FaFacebook } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef();
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const handleMouseEnter = (name) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 100);
  };

  return (
    <>
      {/* 🔸 Sticky Navbar */}
      <div className="sticky top-0 uppercase font-semibold text-sm z-50 bg-red-700 shadow-md">
        <div className="w-full mx-auto px-6 h-13 md:h-17 py-4 flex items-center justify-between">
          {/* 🔹 Logo */}
          <div className="flex items-center gap-2">
            <div className="relative w-[50px] h-[50px]">
              <Image
                src="/logo.jpg"
                alt="Logo"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-base text-white md:text-lg">Afroza Khan Rita</p>
          </div>

          {/* 🟦 Desktop Menu */}
          <ul className="hidden md:flex space-x-7 h-20 items-center relative z-[60]">
            {NavItem.map((item) => (
              <li
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href || "#"}
                  className={`cursor-pointer select-none flex items-center gap-1 hover:text-sky-700 ${
                    pathname === item.href ? "text-white" : ""
                  }`}
                >
                  <span>{item.name}</span>
                  {item.dropdown && <GoChevronDown className="text-sm mt-[1px]" />}
                </Link>

                {/* spacer for dropdown hover zone */}
                <div className="absolute top-full left-0 w-full h-7"></div>

                <AnimatePresence>
                  {openDropdown === item.name && item.dropdown && (
                    <motion.ul
                      initial={{ height: 0 }}
                      animate={{
                        height: dropdownHeight || "auto",
                        transition: { duration: 0.2, ease: "easeOut" },
                      }}
                      exit={{
                        height: 0,
                        transition: { duration: 0, ease: "easeIn" },
                      }}
                      className={`mt-[24px] overflow-hidden ${
                        item.dropdown.length > 7
                          ? "absolute left-1/2 top-full -translate-x-1/2 bg-white shadow-xl border border-gray-300 grid grid-cols-2 gap-x-6 px-8 py-5 max-w-[700px] min-w-[500px] z-[60]"
                          : "absolute top-full left-0 bg-white shadow-xl border border-gray-300 flex flex-col w-auto px-4 py-2 z-[60]"
                      }`}
                    >
                      {item.dropdown.map((subItem, index) => (
                        <li key={subItem.name + index} className="relative">
                          <Link
                            href={subItem.href || "#"}
                            className={`w-full min-w-[200px] font-mono text-sm py-2 px-4 whitespace-nowrap flex items-center justify-between duration-300 ${
                              pathname === subItem.href
                                ? "text-white"
                                : "text-black hover:text-sky-900"
                            }`}
                          >
                            <span>{subItem.name}</span>
                            {subItem.dropdown && (
                              <FaChevronRight className="text-sm mt-[1px]" />
                            )}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* 🟦 Desktop Button */}
          <Link
            href="/"
            className=" bg-white text-blue rounded-full px-1 text-3xl py-1 hidden md:flex items-center gap-2"
          >
            <FaFacebook />
          </Link>

          {/* 🟦 Mobile Menu Toggle */}
          <div
            className="md:hidden text-3xl cursor-pointer text-white select-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <IoMdClose /> : "☰"}
          </div>
        </div>
      </div>

      {/* 🔸 Mobile Menu Drawer — TOP SLIDE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-13 left-0 w-full h-auto bg-white rounded-b-2xl shadow-2xl z-50 p-6 overflow-y-auto"
          >
            <ul className="flex flex-col items-left space-y-0 w-full">
              {NavItem.map((item, i) => (
                <li key={i} className="text-left w-full">
                  {/* Main Item */}
                  <Link
                    href={item.href || "#"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full py-3 px-3  text-base transition-all duration-200 ${
                      pathname === item.href
                        ? "text-red-600"
                        : "text-gray-700"
                    } hover:bg-gray-100`}
                  >
                    {item.name}
                  </Link>

                  {/* Dropdown Items */}
                  {item.dropdown && (
                    <ul className="flex flex-col w-full ml-4">
                      {item.dropdown.map((sub, j) => (
                        <li key={j} className="w-full">
                          <Link
                            href={sub.href || "#"}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block w-full py-2 px-3 border-b text-sm transition-all duration-200 ${
                              pathname === sub.href
                                ? "text-sky-500"
                                : "text-gray-600"
                            } hover:bg-gray-100`}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Background Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
