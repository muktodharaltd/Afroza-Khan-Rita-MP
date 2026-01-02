'use client'

import React, { useState, useEffect } from 'react'
import { FaRegEye } from 'react-icons/fa'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

export default function ComplaintsView() {
  const [complaintsData, setComplaintsData] = useState([])
  const [visibleCount, setVisibleCount] = useState(6)
  const [expandedRows, setExpandedRows] = useState([])
  const [viewMode, setViewMode] = useState('table') // default table

  // Fetch complaints from API
  useEffect(() => {
    if (!API_BASE) return

    const fetchVideos = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/request-submissions`)
        const result = await res.json()
        setComplaintsData(result.data || [])
      } catch (err) {
        console.error('Request submissions load failed', err)
        setComplaintsData([])
      }
    }

    fetchVideos()
  }, [])

  const handleViewAll = () => {
    setVisibleCount(complaintsData.length)
  }

  const toggleRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id))
    } else {
      setExpandedRows([...expandedRows, id])
    }
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
    if (status === 'মীমাংসিত') return 'bg-brandGreen'
    if (status === 'চলমান') return 'bg-brandYellow'
    return 'bg-brandGray'
  }

  return (
    <div className="shadow-lg  m-0.5">
      <div className="bg-white rounded-xl  max-w-7xl mx-auto mt-5">
        <div className="pt-5 ">
          {/* Title + View Toggle */}
          <div className="flex  items-start  justify-between  mb-5">
            <h2 className="text-2xl md:text-3xl mt-1 font-bold  text-brandGreen">
              প্রাপ্ত অভিযোগ
            </h2>

            <div className="flex items-center gap-2  border-b">
              <div className="flex rounded-xl p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded-md text-sm shadow-sm transition ${
                    viewMode === 'table'
                      ? 'ring-2 ring-brandGreen bg-brandYellow'
                      : 'ring-0'
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-md text-sm shadow-sm transition ${
                    viewMode === 'grid'
                      ? 'ring-2 ring-brandGreen bg-brandYellow'
                      : 'ring-0'
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
                    {/* Top color bar */}
                    <div
                      className="h-2 w-full"
                      style={{
                        background: hasProgress
                          ? getProgressColor(c.progress)
                          : c.status === 'মীমাংসিত'
                          ? 'var(--color-brandGreen)'
                          : c.status === 'চলমান'
                          ? 'var(--color-brandYellow)'
                          : 'var(--color-brandGray)',
                      }}
                    />

                    {/* Status badge top-right */}
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
                      <p className="text-sm text-brandGray mt-1">{c.subject}</p>
                      <p className="text-xs text-brandGray mt-1">
                        {new Date(c.created_at).toLocaleDateString('bn-BD')}
                      </p>
                      <p className="text-sm text-brandGray mt-3">
                        {truncateDescription(c.detailed_description, 30)}
                      </p>

                      <div className="mt-3 text-xs text-brandGray">
                        <p>
                          <strong>Address:</strong> {c.address}
                        </p>
                        <p>
                          <strong>Email:</strong> {c.email}
                        </p>
                        <p>
                          <strong>Mobile:</strong> {c.mobile_number}
                        </p>
                      </div>

                      {hasProgress && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-brandGray mb-1">
                            Progress: {Math.round(c.progress)}%
                          </p>
                          <div className="w-full h-3 bg-brandGray rounded-full overflow-hidden">
                            <div
                              className="h-full"
                              style={{
                                width: `${c.progress}%`,
                                background: getProgressColor(c.progress),
                              }}
                            />
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => toggleRow(c.id)}
                        className="text-sm mt-4 bg-brandYellow text-white px-3 py-1 rounded-md shadow hover:bg-brandGreen transition"
                      >
                        {expandedRows.includes(c.id)
                          ? 'Hide details'
                          : 'View details'}
                      </button>

                      {expandedRows.includes(c.id) && (
                        <div className="mt-3 text-sm text-brandGray border-t pt-3">
                          <p className="mb-2 font-semibold">
                            Full description:
                          </p>
                          <p>{c.detailed_description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* ---------------- TABLE VIEW ---------------- */}
          {viewMode === 'table' && (
            <>
              <div className="  overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-brandGray">
                  <thead className="bg-brandGray">
                    <tr>
                      <th className="px-2 py-2 text-left text-sm font-semibold text-white hidden md:block">
                        Date
                      </th>
                      <th className="px-2 py-2 text-left text-sm font-semibold text-white">
                        Name
                      </th>
                      <th className="px-0 py-2 text-left text-sm font-semibold text-white hidden md:block">
                        Email
                      </th>
                      <th className="px-0 py-2 text-left text-sm font-semibold text-white">
                        Subject
                      </th>
                      <th className="px-0 py-2 text-left text-sm font-semibold text-white">
                        Address
                      </th>
                      <th className="px-0 py-2 text-left text-sm font-semibold text-white">
                        Status
                      </th>
                      <th className="pr-2 py-2 text-left text-sm font-semibold text-white">
                        Details
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-brandGray text-brandGray">
                    {complaintsData.slice(0, visibleCount).map((c) => (
                      <React.Fragment key={c.id}>
                        <tr className="hover:bg-brandGray-soft">
                          <td className="px-2 py-2 text-sm hidden md:block">
                            {new Date(c.created_at).toLocaleDateString('bn-BD')}
                          </td>
                          <td className="px-2 py-2 text-sm font-bold">
                            {c.name}
                          </td>
                          <td className="px-1 py-2 text-sm hidden md:block">
                            {c.email}
                          </td>
                          <td className="px-1 py-2 text-sm">{c.subject}</td>
                          <td className="px-1 py-2 text-sm">{c.address}</td>
                          <td className="px-1 py-2 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${statusBadgeClass(
                                c.status
                              )}`}
                            >
                              {c.status}
                            </span>
                          </td>
                         <td
                            className="px-0 py-2 text-sm text-brandGreen flex md:justify-start justify-center items-center gap-2 cursor-pointer"
                            onClick={() => toggleRow(c.id)}
                          >
                            <FaRegEye />
                          </td>
                        </tr>

                        {expandedRows.includes(c.id) && (
                          <tr
                            className="bg-white"
                            style={{
                              backgroundColor: 'rgba(13, 132, 72, 0.08)',
                            }}
                          >
                            <td colSpan={7} className="px-4 py-2 text-xl">
                              {c.detailed_description}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* View All Button */}
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
