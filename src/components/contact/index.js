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
    toast.success(' Report Submitted Successfully!', {
      position: 'bottom-right',
      autoClose: 3000,
    })
    console.log(' Submitted Data:', form)
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
      <section className="relative bg-cover bg-center  min-h-[70vh] flex flex-col md:flex-row items-start shadow-sm ">
        <div className="w-full px-2 md:px-0">
          <div className="md:max-w-7xl md:mx-auto mb-5 md:py-5 flex flex-col md:flex-row gap-6 md:gap-12">
            {/* LEFT: Image */}
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="relative w-full h-[300px] md:h-[640px] overflow-hidden rounded-lg mt-1 md:mt-26">
                <Image
                  src="/contact.jpg"
                  alt="Afroza Khanam Rita"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Mobile Name / Title */}
              <h1 className="mt-3 md:mt-6 text-2xl md:text-5xl font-bold text-brandGreen text-center md:text-left">
                আফরোজা খানম রিতা
              </h1>
            </div>

            {/* RIGHT: Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="w-full bg-brandGreen text-white p-3 md:p-8 md:rounded-xl md:shadow-2xl md:max-w-xl h-auto md:h-[640px] flex flex-col shadow-lg">
                <h4 className="text-center text-base md:text-xl font-bold mb-3 md:mb-6">
                  আপনার চাওয়া জানিয়ে দিন
                </h4>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 md:space-y-4 overflow-auto flex-1"
                >
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="আপনার নাম"
                    required
                    className="w-full p-2 rounded bg-white text-brandGray focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="বিষয়"
                    required
                    className="w-full p-2 rounded bg-white text-brandGray focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="ঠিকানা"
                    required
                    className="w-full p-2 rounded bg-white text-brandGray focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ইমেইল / যদি থাকে"
                    className="w-full p-2 rounded bg-white text-brandGray focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <input
                    type="text"
                    name="nid"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="জাতীয় পরিচয় পত্রের নাম্বার"
                    required
                    className="w-full p-2 rounded bg-white text-brandGray focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="বিস্তারিত বিবরণ"
                    rows="4"
                    className="w-full p-2 rounded bg-white text-brandGray focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full bg-brandYellow text-white font-semibold py-2 rounded transition hover:bg-brandGreen"
                  >
                    জমা দিন
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer />
    </>
  )
}
