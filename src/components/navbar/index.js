'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import NavItem from './menusData'
import { GoChevronDown } from 'react-icons/go'
import { FaChevronRight, FaFacebook } from 'react-icons/fa6'
import { FaTwitter, FaLinkedin, FaTiktok } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { usePathname } from 'next/navigation'
import { set } from 'react-hook-form'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL
console.log(API_BASE)

const Navbar = () => {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const timeoutRef = useRef()
  const [dropdownHeight, setDropdownHeight] = useState(0)
  const [logoName, setLogoName] = useState([])

  useEffect(() => {
    console.log('API BASE 👉', API_BASE)

    if (!API_BASE) return

    const fetchLogoName = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/header-logos`)
        const data = await response.json()
        setLogoName(data.data || [])
        console.log('Fetched logo name:', data)
      } catch (error) {
        console.error('Error fetching logo name:', error)
        setLogoName([])
      } finally {
        // You can set loading heare if needed
      }
    }

    fetchLogoName()
  }, [])

  const handleMouseEnter = (name) => {
    clearTimeout(timeoutRef.current)
    setOpenDropdown(name)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 100)
  }

  return (
    <>
      {/* 🔸 Sticky Navbar */}
      <div className="sticky top-0 uppercase font-semibold text-sm z-50 bg-brandGreen shadow-sm">
        <div className="w-full mx-auto px-6 h-13 md:h-17 py-4 flex items-center justify-between md:justify-center relative">
          <div className="flex items-center gap-2 absolute left-5 md:left-10">
            {logoName?.logo_header && (
              <div className="flex items-center gap-2">
                <Image
                  src={logoName.logo_header}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="rounded-full"
                  unoptimized
                />
                <p
                  className="text-white font-semibold text-lg md:text-sm lg:text-gl xl:text-lg"
                >
                  {logoName.name_bn}
                </p>
              </div>
            )}
          </div>

          {/* 🟦 Desktop Menu (Centered) */}
          <ul className="hidden md:flex space-x-7 h-20 items-center relative z-[60]">
            {NavItem.map((item) => (
              <li
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href || '#'}
                  className={`cursor-pointer select-none flex items-center gap-1 text-white hover:text-brandYellow ${
                    pathname === item.href ? 'text-brandYellow' : 'text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <GoChevronDown className="text-sm mt-[1px]" />
                  )}
                </Link>

                <div className="absolute top-full left-0 w-full h-7"></div>

                <AnimatePresence>
                  {openDropdown === item.name && item.dropdown && (
                    <motion.ul
                      initial={{ height: 0 }}
                      animate={{
                        height: dropdownHeight || 'auto',
                        transition: { duration: 0.2, ease: 'easeOut' },
                      }}
                      exit={{
                        height: 0,
                        transition: { duration: 0, ease: 'easeIn' },
                      }}
                      className={`mt-[24px] overflow-hidden ${
                        item.dropdown.length > 7
                          ? 'absolute left-1/2 top-full -translate-x-1/2 bg-white shadow-xl border grid grid-cols-2 gap-x-6 px-8 py-5 max-w-[700px] min-w-[500px] z-[60]'
                          : 'absolute top-full left-0 bg-white shadow-xl border flex flex-col w-auto px-4 py-2 z-[60]'
                      }`}
                    >
                      {item.dropdown.map((subItem, index) => (
                        <li key={subItem.name + index} className="relative">
                          <Link
                            href={subItem.href || '#'}
                            className={`w-full min-w-[200px] font-mono text-sm py-2 px-4 whitespace-nowrap flex items-center justify-between duration-300 ${
                              pathname === subItem.href
                                ? 'text-white'
                                : 'text-brandGray hover:text-brandYellow'
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

          {/* 🟦 Desktop Only Social Icons — Mobile এ লুকানো */}
          {logoName?.logo_header && (
            <div className="hidden md:flex gap-2 absolute right-6 top-1/2 -translate-y-1/2">
              <a
                href={logoName.facebook}
                target="blank"
                className="p-2 rounded-full bg-white hover:bg-brandYellow shadow-sm"
              >
                <FaFacebook />
              </a>
              <a
                href={logoName.instagram}
                target="blank"
                className="p-2 rounded-full bg-white hover:bg-brandYellow shadow-sm"
              >
                <FaTiktok />
              </a>
              <a
                href={logoName.twitter}
                target="blank"
                className="p-2 rounded-full bg-white hover:bg-brandYellow shadow-sm"
              >
                <FaTwitter />
              </a>
              <a
                href={logoName.linkedin}
                target="blank"
                className="p-2 rounded-full bg-white hover:bg-brandYellow shadow-sm"
              >
                <FaLinkedin />
              </a>
            </div>
          )}
          {/* 🟦 Mobile Menu Toggle */}
          <div
            className="md:hidden text-3xl text-white ml-auto cursor-pointer select-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <IoMdClose /> : '☰'}
          </div>
        </div>
      </div>

      {/* darker gray gradient shadow/separator below navbar */}
      <div
        className="w-full h-3 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(13, 132, 72, 0.4), transparent)',
        }}
      />

      {/* 🔸 Mobile Menu Drawer — TOP SLIDE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-13 left-0 w-full h-auto bg-white rounded-b-2xl shadow-2xl z-50 p-6 overflow-y-auto"
            style={{
              // keep drawer shadow consistent with navbar
              boxShadow: '0 14px 40px rgba(15,23,42,0.45)',
            }}
          >
            <ul className="flex flex-col items-left space-y-0 w-full">
              {NavItem.map((item, i) => (
                <li key={i} className="text-left w-full">
                  {/* Main Item */}
                  <Link
                    href={item.href || '#'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full py-3 px-3  text-base transition-all duration-200 ${
                      pathname === item.href
                        ? 'text-brandGreen'
                        : 'text-brandGray'
                    } hover:bg-brandYellow`}
                  >
                    {item.name}
                  </Link>

                  {/* Dropdown Items */}
                  {item.dropdown && (
                    <ul className="flex flex-col w-full ml-4">
                      {item.dropdown.map((sub, j) => (
                        <li key={j} className="w-full">
                          <Link
                            href={sub.href || '#'}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block w-full py-2 px-3 border-b text-sm transition-all duration-200 ${
                              pathname === sub.href
                                ? 'text-brandYellow'
                                : 'text-brandGray'
                            } hover:bg-brandYellow`}
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
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Navbar
