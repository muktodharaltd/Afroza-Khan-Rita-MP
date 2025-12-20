

'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

export default function Contact() {
  const [form, setForm] = useState({
    username: '',
    subject: '',
    location: '',
    email: '',
    mobile: '',
    voterId: '',
    description: '',
  })

  const [loading, setLoading] = useState(false)
  const [formImage, setFormImage] = useState(null)

  /* 🔹 FETCH FORM IMAGE */
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/request-form-image`)
        const data = await res.json()

        if (res.ok && data.success) {
          setFormImage(data.data.image)
        }
      } catch (error) {
        console.error('Image fetch error:', error)
      }
    }

    fetchImage()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/api/request-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.username,
          subject: form.subject,
          address: form.location,
          email: form.email,
          mobile_number: form.mobile,
          voter_id_card_number: form.voterId,
          detailed_description: form.description,
        }),
      })

      const result = await res.json()

      if (res.ok && result.success) {
        toast.success('রিপোর্ট সফলভাবে জমা হয়েছে!', {
          position: 'bottom-right',
          autoClose: 3000,
        })

        setForm({
          username: '',
          subject: '',
          location: '',
          email: '',
          mobile: '',
          voterId: '',
          description: '',
        })
      } else {
        toast.error(result.message || 'কিছু সমস্যা হয়েছে!')
      }
    } catch (error) {
      toast.error('সার্ভারের সাথে সংযোগ সমস্যা!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="relative min-h-[70vh] flex flex-col md:flex-row shadow-sm">
        <div className="w-full px-2 md:px-0">
          <div className="md:max-w-7xl md:mx-auto mb-5 md:py-5 flex flex-col md:flex-row gap-6 md:gap-12">

            {/* LEFT IMAGE */}
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="relative w-full h-[300px] md:h-[640px] mt-17 overflow-hidden rounded-lg">
                {formImage ? (
                  <img
                    src={formImage}
                    alt="Afroza Khanam Rita"
                 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
              
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                )}
              </div>

              <h1 className="mt-3 md:mt-6 text-2xl md:text-5xl font-bold text-brandGreen text-center md:text-left">
                আফরোজা খানম রিতা
              </h1>
            </div>

            {/* RIGHT FORM */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="w-full bg-brandGreen text-white p-3 md:p-8 md:rounded-xl md:shadow-2xl md:max-w-xl md:h-[640px] flex flex-col">
                <h4 className="text-center text-base md:text-xl font-bold mb-4">
                  আপনার চাওয়া জানিয়ে দিন
                </h4>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 overflow-auto flex-1"
                >
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="আপনার নাম"
                    required
                    className="w-full p-2 rounded bg-white text-brandGray"
                  />

                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="বিষয়"
                    required
                    className="w-full p-2 rounded bg-white text-brandGray"
                  />

                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="ঠিকানা"
                    required
                    className="w-full p-2 rounded bg-white text-brandGray"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ইমেইল (যদি থাকে)"
                    className="w-full p-2 rounded bg-white text-brandGray"
                  />

                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="মোবাইল নম্বর"
                    required
                    className="w-full p-2 rounded bg-white text-brandGray"
                  />

                  <input
                    type="text"
                    name="voterId"
                    value={form.voterId}
                    onChange={handleChange}
                    placeholder="ভোটার আইডি কার্ড নাম্বার"
                    className="w-full p-2 rounded bg-white text-brandGray"
                  />

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="বিস্তারিত বিবরণ"
                    rows="4"
                    className="w-full p-2 rounded bg-white text-brandGray resize-none"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brandYellow text-white font-semibold py-2 rounded hover:bg-brandGreen hover:border disabled:opacity-60"
                  >
                    {loading ? 'জমা হচ্ছে...' : 'জমা দিন'}
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
