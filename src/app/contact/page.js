'use client'

import Contact from '@/components/contact'
import React from 'react'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

export default function ContactPage() {
  const { useState, useEffect } = React
  const [title, setTitle] = useState([])

  useEffect(() => {
    console.log('API BASE 👉', API_BASE)
    const fetchTitle = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/header-logos`)
        const data = await response.json()
        setTitle(data.data || [])
        console.log('Fetched title:', data)
      } catch (error) {
        console.error('Error fetching title:', error)
        setTitle([])
      } finally {
        // You can set loading heare if needed
      }
    }
    fetchTitle()
  }, [])

  return (
    <div className="space-y-10 px-4 py-10">
      <section className="max-w-5xl mx-auto text-center space-y-4">
        {title?.name_bn && (
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <p className="uppercase  text-brandGreen font-semibold">
              {title.contact_page_title}{' '}
            </p>
            <h1 className="text-4xl font-bold text-brandGray">
              {title.contact_page_subtitle}
            </h1>
            <p className="text-base text-brandGray/80">
              {title.contact_page_description}
            </p>
          </div>
        )}
      </section>

      <section>
        {title?.name_bn && (
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 bg-brandGreen/10 border border-brandGreen/60 rounded-2xl p-6 md:p-6 text-center">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-brandGreen mb-2">
                ঠিকানা
              </p>
              <p>{title.address}</p>
            </div>

            <div className="flex-1 bg-brandGreen/10 border border-brandGreen/60 rounded-2xl p-6 md:p-6 text-center">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-brandGreen mb-2">
                ফোন
              </p>
              <p>{title.phone}</p>
            </div>

            <div className="flex-1 bg-brandGreen/10 border border-brandGreen/60 rounded-2xl p-6 md:p-6 text-center">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-brandGreen mb-2">
                ইমেইল
              </p>
              <p>{title.email}</p>
            </div>
          </div>
        )}
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <Contact />
        </div>
      </section>
    </div>
  )
}