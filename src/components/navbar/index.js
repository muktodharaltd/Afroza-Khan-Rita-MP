"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavItem from "./menusData";
import { GoChevronDown } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa6";

import { FaFacebook } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  const timeoutRef = useRef();
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const handleMouseEnter = (name) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(name);
    setHoveredSubItem(null);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      setHoveredSubItem(null);
    }, 100);
  };

  return (
    <>
      {/* 🔸 Sticky Navbar */}
      <div className="sticky top-0 uppercase font-semibold text-sm z-50 bg-white shadow-md">
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
            <p className="text-base md:text-lg">Afroza Khan Rita</p>
          </div>

          {/* 🟦 Desktop Menu */}
          <ul className="hidden md:flex space-x-7 h-20 items-center">
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
                    pathname === item.href ? "text-sky-900" : ""
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
                      className={`mt-[24px] z-[9999] overflow-hidden ${
                        item.dropdown.length > 7
                          ? "absolute left-1/2 top-full -translate-x-1/2 bg-white shadow-xl border border-gray-300 grid grid-cols-2 gap-x-6 px-8 py-5 max-w-[700px] min-w-[500px]"
                          : "absolute top-full left-0 bg-white shadow-xl border border-gray-300 flex flex-col w-auto px-4 py-2"
                      }`}
                    >
                      {item.dropdown.map((subItem, index) => (
                        <li key={subItem.name + index} className="relative">
                          <Link
                            href={subItem.href || "#"}
                            className={`w-full min-w-[200px] font-mono text-sm py-2 px-4 whitespace-nowrap flex items-center justify-between duration-300 ${
                              pathname === subItem.href
                                ? "text-sky-900"
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
            className="hover:bg-sky-900 bg-sky-900 text-white rounded px-3 text-3xl py-2 hidden md:flex items-center gap-2"
          >
           <FaFacebook/>
          </Link>

          {/* 🟦 Mobile Menu Toggle */}
          <div
            className="md:hidden text-3xl cursor-pointer select-none"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            ☰
          </div>
        </div>
      </div>

      {/* 🔸 Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-white shadow-2xl z-[99999] p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <p className="font-bold text-lg">Menu</p>
              <IoMdClose
                className="text-3xl cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>

            <ul className="flex flex-col space-y-3">
              {NavItem.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href || "#"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 text-base ${
                      pathname === item.href
                        ? "text-sky-500"
                        : "text-gray-700 hover:text-sky-500"
                    }`}
                  >
                    {item.name}
                  </Link>

                  {item.dropdown && (
                    <ul className="ml-4 border-l border-gray-200 pl-2">
                      {item.dropdown.map((sub, j) => (
                        <li key={j}>
                          <Link
                            href={sub.href || "#"}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block py-1 text-sm ${
                              pathname === sub.href
                                ? "text-sky-500"
                                : "text-gray-600 hover:text-sky-500"
                            }`}
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
          className="fixed inset-0 bg-black/40 z-[99998]"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
