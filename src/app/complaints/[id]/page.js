'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

export default function ComplaintDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id || !API_BASE) return

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/request-submissions`)
        const text = await res.text() // 🔥 SAFE

        let result
        try {
          result = JSON.parse(text)
        } catch {
          console.error('API JSON না পাঠাচ্ছে:', text)
          setData(null)
          return
        }

        const found = result.data?.find(
          (item) => String(item.id) === String(id)
        )

        setData(found || null)
      } catch (err) {
        console.error(err)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <p className="p-5">লোড হচ্ছে...</p>
  if (!data) return <p className="p-5 text-red-500">ডাটা পাওয়া যায়নি</p>

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <button
        onClick={() => router.back()}
        className="text-sm text-brandGreen underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-brandGreen mb-2">
        {data.subject}
      </h1>

      <p className="text-sm text-brandGray mb-6">
        {new Date(data.created_at).toLocaleDateString('bn-BD')}
      </p>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">আপনার প্রশ্ন</h2>
        <p className="text-brandGray text-justify">
          {data.detailed_description}
        </p>
      </div>

      <div className="bg-brandGray-soft shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2 text-brandGreen">
          রিতা আপার উত্তর
        </h2>

        {data.admin_answer ? ( 
          <p className="text-brandGray text-justify">
            {data.admin_answer}
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            এখনো উত্তর দেওয়া হয়নি
          </p>
        )}
      </div>
    </div>
  )
}
