'use client'

import React, { useState } from 'react'
import complaintsData from './report.json'
import { FaRegEye } from 'react-icons/fa'

export default function ComplaintsView() {
  const [visibleCount, setVisibleCount] = useState(6)
  const [expandedRows, setExpandedRows] = useState([])
  const [viewMode, setViewMode] = useState('table') // default table

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

  const getStatusText = (status) => {
    if (status === 'Resolved') return 'মীমাংসিত'
    if (status === 'In Progress') return 'চলমান'
    return status
  }

  return (
      <div className="shadow-lg py-6 m-0.5 ">
    <div className=" bg-white rounded-xl p-5 max-w-7xl mx-auto mt-5 ">
      {/* Padding wrapper */}
      <div className="pt-5 px-4">
        {/* Title + View Toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-brandGreen">প্রাপ্ত অভিযোগ</h2>

          <div className="flex items-center gap-3 mt-3 md:mt-0 border-b">
            {/* View toggle buttons */}
            <div className="flex  rounded-xl p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-md text-sm   shadow-sm transition ${
                  viewMode === 'table' ? 'ring-2 ring-brandGreen bg-brandYellow ' : 'ring-0'
                }`}
              >
                Table
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md text-sm   shadow-sm transition ${
                  viewMode === 'grid' ? 'ring-2 ring-brandGreen bg-brandYellow' : 'ring-0'
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
                    {getStatusText(c.status)}
                  </span>

                  <div className="p-4">
                    <h3 className="text-2xl font-bold text-brandGray">{c.name}</h3>
                    <p className="text-sm text-brandGray mt-1">{c.subject}</p>
                    <p className="text-xs text-brandGray mt-1">{c.date}</p>
                    <p className="text-sm text-brandGray mt-3">
                      {truncateDescription(c.description, 30)}
                    </p>
                      <div className="mt-3 text-xs text-brandGray">
                      <p>
                        <strong>Location:</strong> {c.location}
                      </p>
                      <p>
                        <strong>Email:</strong> {c.email}
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
                      {expandedRows.includes(c.id) ? 'Hide details' : 'View details'}
                    </button>
                    {expandedRows.includes(c.id) && (
                      <div className="mt-3 text-sm text-brandGray border-t pt-3">
                        <p className="mb-2 font-semibold">Full description:</p>
                        <p>{c.description}</p>
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
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-brandGray">
                <thead className="bg-brandGray">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Date</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Email</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Subject</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Location</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">Details</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-brandGray text-brandGray">
                  {complaintsData.slice(0, visibleCount).map((c) => (
                    <React.Fragment key={c.id}>
                      <tr className="hover:bg-brandGray-soft">
                        <td className="px-4 py-2 text-sm">{c.date}</td>
                        <td className="px-4 py-2 text-sm font-bold">{c.name}</td>
                        <td className="px-4 py-2 text-sm">{c.email}</td>
                        <td className="px-4 py-2 text-sm">{c.subject}</td>
                        <td className="px-4 py-2 text-sm">{c.location}</td>
                        <td className="px-4 py-2 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${statusBadgeClass(c.status)}`}
                          >
                            {getStatusText(c.status)}
                          </span>
                        </td>
                        <td
                          className="px-4 py-2 text-sm text-brandGreen flex items-center gap-2 cursor-pointer"
                          onClick={() => toggleRow(c.id)}
                        >
                          <FaRegEye />
                        </td>
                      </tr>

                      {/* Description row */}
                      {expandedRows.includes(c.id) && (
                        <tr className="bg-white" style={{ backgroundColor: "rgba(13, 132, 72, 0.08)" }}>
                          <td colSpan={7} className="px-4 py-2 text-xl ">
                            {c.description}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Accordion */}
            <div className="md:hidden flex flex-col space-y-4">
              {complaintsData.slice(0, visibleCount).map((c) => (
                <div key={c.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center px-4 py-3 cursor-pointer"
                    onClick={() => toggleRow(c.id)}
                  >
                    <div>
                      <p className="font-semibold text-brandGreen">{c.name}</p>
                      <p className="text-sm text-brandGreen">{c.subject}</p>
                    </div>
                    <div className="text-brandGreen font-bold">
                      {expandedRows.includes(c.id) ? '-' : '+'}
                    </div>
                  </div>
                  {expandedRows.includes(c.id) && (
                    <div className="px-4 py-3 border-t border-brandGray text-sm text-brandGray space-y-1">
                      <p><strong>ইমেইল:</strong> {c.email}</p>
                      <p><strong>তারিখ:</strong> {c.date}</p>
                      <p><strong>স্থান:</strong> {c.location}</p>
                      <p><strong>বিবরণ:</strong> {c.description}</p>
                      <p>
                        <strong>অবস্থা:</strong>{' '}
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${statusBadgeClass(c.status)}`}
                        >
                          {getStatusText(c.status)}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
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
