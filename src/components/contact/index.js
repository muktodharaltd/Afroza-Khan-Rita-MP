'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Contact() {
  const [form, setForm] = useState({
    username: '',
    subject: '',
    location: '',
    email: '',
    mobile: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('✅ Report Submitted Successfully!', {
      position: 'bottom-right',
      autoClose: 3000,
    })
    console.log('📩 Submitted Data:', form)
    setForm({
      username: '',
      subject: '',
      location: '',
      email: '',
      mobile: '',
      description: '',
    })
  }

  return (
    <>
      {/* 🏔️ Hero Section */}
      <section className="relative bg-cover bg-center min-h-[70vh] flex items-center bg-indigo-50">
             <div className="mx-10 pl-20 md:mx-20 flex flex-col md:flex-row items-center  justify-between gap-12">

        <div className="relative container mx-auto px-4 z-10 grid md:grid-cols-2 gap-10  justify-between items-center text-white">
          {/* Left Text */}
          <div className="pt-32">
            <Image
              src="/contact.jpg"
              alt="Afroza Khan Rita"
              width={470}
              height={20}
              className="rounded-lg shadow-lg mb-5"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-sky-800">
              Afroza Khan Rita
            </h1>
            <p className="text-lg mb-4 text-sky-900">Member of Parliament  <span  className="text-blue-500 underline">Read More</span></p>
           
          </div>

          {/* Right Form */}
          <div className="bg-sky-900 rounded-xl max-w-xl shadow-lg p-6 mt-10 md:mt-0 text-white">
            <h4 className="text-center text-xl font-bold mb-6">
            Submit your complaint
            </h4>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full p-3 rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full p-3 rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Incident Location"
                required
                className="w-full p-3 rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                required
                className="w-full p-3 rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows="3"
                className="w-full p-3 rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              />

              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded transition"
              >
                Submit Your Application
              </button>
            </form>
          </div>
        </div>
        </div>
      </section>

      <ToastContainer />
    </>
  )
}
