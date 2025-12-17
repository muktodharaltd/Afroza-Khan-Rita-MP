'use client'

import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaLinkedin, FaTiktok } from 'react-icons/fa'
import Image from 'next/image'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL
console.log(API_BASE)

export default function Footer() {
  const { useState, useEffect } = React
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

  return (
    <footer className="bg-brandGreen text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top: responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
          {/* Branding - on small screens span 2 cols so other sections can share space compactly */}
          <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className=" rounded-full  ">
                {logoName?.logo_header && (
                  <div>
                    <div className="flex  items-center gap-2">
                      <Image
                        src={logoName.logo_footer}
                        alt="Logo"
                        width={56}
                        height={56}
                        className="rounded-full"
                        unoptimized
                      />
                      <p className="text-white text-xl ">{logoName.name_eng}</p>
                    </div>
                    <p className="text-white text-sm  pt-5">
                      {logoName.footer_description}
                    </p>
                  </div>
                )}
              </div>
              <div></div>
            </div>

            {logoName?.logo_header && (
              <div className="flex gap-2 mt-2">
                <a
                  href={logoName.facebook}
                  target="blank"
                  className="p-2 rounded-full bg-brandYellow hover:bg-brandGray transition-all duration-500 transform hover:rotate-y-180 shadow-sm"
                >
                  <FaFacebook />
                </a>

                <a
                  href={logoName.instagram}
                  target="blank"
                  className="p-2 rounded-full bg-brandYellow hover:bg-brandGray transition-all duration-500 transform hover:rotate-y-180 shadow-sm"
                >
                  <FaTiktok />
                </a>

                <a
                  href={logoName.twitter}
                  target="blank"
                  className="p-2 rounded-full bg-brandYellow hover:bg-brandGray transition-all duration-500 transform hover:rotate-y-180 shadow-sm"
                >
                  <FaTwitter />
                </a>

                <a
                  href={logoName.linkedin}
                  target="blank"
                  className="p-2 rounded-full bg-brandYellow hover:bg-brandGray transition-all duration-500 transform hover:rotate-y-180 shadow-sm"
                >
                  <FaLinkedin />
                </a>
              </div>
            )}
          </div>

          {/* Quick Links - single row with pipe separators */}
          <div className="text-sm">
            <h6 className="text-base font-semibold mb-2">Quick Links</h6>
            <nav className="flex items-center gap-2 whitespace-nowrap overflow-x-auto text-white">
              <Link href="/" className="hover:text-brandYellow transition">
                Home
              </Link>
              <span className="opacity-80">|</span>
              <Link
                href="/parichiti"
                className="hover:text-brandYellow transition"
              >
                About
              </Link>
              <span className="opacity-80">|</span>
              <Link
                href="/nari-shakti"
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
          {logoName?.logo_header && (
          <div className="text-sm">
            <p className="text-xl">ঠিকানা</p>
            <p className='mt-2'>{logoName.address} </p>
            <p className='mt-2'>ফোন: {logoName.phone} </p>
            <p className='mt-2'>ইমেইল: {logoName.email} </p>

            <div className="mt-3">
              <Link href="/contact">
                <button className="text-white px-3 py-1 bg-brandYellow hover:bg-brandGray font-semibold rounded-md shadow-sm hover:shadow transition text-sm">
                  Contact Office
                </button>
              </Link>
            </div>
          </div>
          )}  
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
