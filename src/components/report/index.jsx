'use client'

import React, { useState, useEffect } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

export default function ComplaintsView() {
  const router = useRouter()
  const [complaintsData, setComplaintsData] = useState([])
  const [visibleCount, setVisibleCount] = useState(6)
  const [viewMode, setViewMode] = useState('table')

  // Fetch complaints
  useEffect(() => {
    if (!API_BASE) return

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/request-submissions`)
        const result = await res.json()
        setComplaintsData(result.data || [])
      } catch (err) {
        console.error('Request submissions load failed', err)
        setComplaintsData([])
      }
    }

    fetchData()
  }, [])

  const handleViewAll = () => {
    setVisibleCount(complaintsData.length)
  }

  const truncateDescription = (text, wordLimit = 30) => {
    if (!text) return ''
    const words = text.split(' ')
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(' ') + '...'
  }

  const getProgressColor = (progress = 0) => {
    const p = Math.max(0, Math.min(100, Number(progress)))
    if (p >= 66) return 'var(--color-brandGreen)'
    if (p >= 33) return 'var(--color-brandYellow)'
    return 'var(--color-brandGray)'
  }

  const statusBadgeClass = (status) => {
    if (status === 'রিতা আপার উত্তর') return 'bg-brandGreen'
    if (status === 'মতামত গৃহীত হয়েছে') return 'bg-brandYellow'
    return 'bg-brandGray'
  }

  return (
    <div className="shadow-lg m-0.5">
      <div className="bg-white rounded-xl max-w-7xl mx-auto mt-5">
        <div className="pt-5 pb-10">

          {/* Title + Controls */}
          <div className="flex items-start justify-between mb-5">
            <h2 className="text-2xl md:text-3xl mt-1 font-bold text-brandGreen">
              প্রাপ্ত মতামত
            </h2>

            <div className="flex items-center gap-2 border-b">
              <div className="flex rounded-xl p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded-md text-sm shadow-sm ${
                    viewMode === 'table'
                      ? 'ring-2 ring-brandGreen bg-brandYellow'
                      : ''
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-md text-sm shadow-sm ${
                    viewMode === 'grid'
                      ? 'ring-2 ring-brandGreen bg-brandYellow'
                      : ''
                  }`}
                >
                  Grid
                </button>
              </div>

              <select
                value={visibleCount}
                onChange={(e) => setVisibleCount(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={30}>30</option>
                <option value={complaintsData.length}>All</option>
              </select>
            </div>
          </div>

          {/* ---------------- GRID VIEW ---------------- */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {complaintsData.slice(0, visibleCount).map((c) => {
                const hasProgress = !isNaN(c.progress)

                return (
                  <div
                    key={c.id}
                    className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition relative"
                  >
                    <div
                      className="h-2 w-full"
                      style={{
                        background: hasProgress
                          ? getProgressColor(c.progress)
                          : statusBadgeClass(c.status)
                      }}
                    />

                    <span
                      className={`absolute top-3 right-3 px-2 py-1 rounded-full text-white text-xs font-semibold ${statusBadgeClass(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>

                    <div className="p-4">
                      <h3 className="text-2xl font-bold text-brandGray">
                        {c.name}
                      </h3>
                      <p className="text-sm text-brandGray mt-1">
                        {c.subject}
                      </p>
                      <p className="text-xs text-brandGray mt-1">
                        {new Date(c.created_at).toLocaleDateString('bn-BD')}
                      </p>

                      <p className="text-sm text-brandGray mt-3">
                        {truncateDescription(c.detailed_description)}
                      </p>

                      <button
                        onClick={() =>
                          router.push(`/complaints/${c.id}`)
                        }
                        className="text-sm mt-4 bg-brandYellow text-white px-3 py-1 rounded-md shadow hover:bg-brandGreen transition"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* ---------------- TABLE VIEW ---------------- */}
          {viewMode === 'table' && (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-brandGray">
                <thead className="bg-brandGray">
                  <tr>
                    <th className="px-2 py-2 text-left text-sm text-white hidden md:block">
                      Date
                    </th>
                    <th className="px-2 py-2 text-left text-sm text-white">
                      Name
                    </th>
                    <th className="px-2 py-2 text-left text-sm text-white hidden md:block">
                      Email
                    </th>
                    <th className="px-2 py-2 text-left text-sm text-white">
                      Subject
                    </th>
                    <th className="px-2 py-2 text-left text-sm text-white">
                      Address
                    </th>
                    <th className="px-2 py-2 text-left text-sm text-white w-40">
                      Status
                    </th>
                    <th className="px-2 py-2 text-left text-sm text-white">
                      Details
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-brandGray text-brandGray">
                  {complaintsData.slice(0, visibleCount).map((c) => (
                    <tr key={c.id} className="hover:bg-brandGray-soft">
                      <td className="px-2 py-2 text-sm hidden md:block">
                        {new Date(c.created_at).toLocaleDateString('bn-BD')}
                      </td>
                      <td className="px-2 py-2 text-sm font-bold">
                        {c.name}
                      </td>
                      <td className="px-2 py-2 text-sm hidden md:block">
                        {c.email}
                      </td>
                      <td className="px-2 py-2 text-sm">
                        {c.subject}
                      </td>
                      <td className="px-2 py-2 text-sm">
                        {c.address}
                      </td>
                      <td className="px-2 py-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${statusBadgeClass(
                            c.status
                          )}`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td
                        className="px-2 py-2 text-brandGreen cursor-pointer"
                        onClick={() =>
                          router.push(`/complaints/${c.id}`)
                        }
                      >
                        <FaRegEye />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {visibleCount < complaintsData.length && (
            <div className="text-center mt-6">
              <button
                onClick={handleViewAll}
                className="bg-brandYellow text-white px-4 py-2 rounded-md shadow hover:bg-brandGreen transition"
              >
                সব দেখুন
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
