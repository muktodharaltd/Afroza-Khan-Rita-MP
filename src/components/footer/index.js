"use client";
import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 px-6">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        
        {/* Branding */}
        <div className="flex flex-col items-start space-y-3 md:w-1/3">
          <div className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="logo" width={60} height={60} className="rounded-full" />
            <div>
              <p className="text-xl font-semibold text-white">Afroza Khan Rita</p>
              <p className="text-sm text-gray-400">Member of Parliament</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 max-w-xs">
            Dedicated to serving the people with integrity and development.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="md:w-1/3">
          <h6 className="text-lg font-semibold text-white mb-4">Quick Links</h6>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-yellow-400 transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="md:w-1/3">
          <h6 className="text-lg font-semibold text-white mb-4">Follow Us</h6>
          <div className="flex space-x-5 text-yellow-400 text-2xl">
            <Link href="#"><FaFacebook className="hover:text-white transition" /></Link>
            <Link href="#"><FaInstagram className="hover:text-white transition" /></Link>
            <Link href="#"><FaTwitter className="hover:text-white transition" /></Link>
            <Link href="#"><FaLinkedin className="hover:text-white transition" /></Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-700" />

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Developed by{" "}
        <span className="text-yellow-400 font-semibold">
          Muktodhara Technology Limited
        </span>
        
      </div>
    </footer>
  );
};

export default Footer;
