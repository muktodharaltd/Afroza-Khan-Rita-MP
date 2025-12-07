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
    const hue = Math.round((p * 120) / 100) // 0 red → 120 green
    return `hsl(${hue} 75% 40%)`
  }

  const statusBadgeClass = (status) => {
    if (status === 'মীমাংসিত') return 'bg-green-500'
    if (status === 'চলমান') return 'bg-yellow-500'
    return 'bg-red-500'
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
          <h2 className="text-3xl font-bold text-green-600">প্রাপ্ত অভিযোগ</h2>

          <div className="flex items-center gap-3 mt-3 md:mt-0">
            {/* View toggle buttons */}
            <div className="flex bg-white shadow-sm rounded-md p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-md text-sm ${
                  viewMode === 'table'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600'
                }`}
              >
                Table
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md text-sm ${
                  viewMode === 'grid'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600'
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
                        ? '#16a34a'
                        : c.status === 'চলমান'
                        ? '#d97706'
                        : '#dc2626',
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
                    <h3 className="text-2xl font-bold text-gray-800">{c.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{c.subject}</p>
                    <p className="text-xs text-gray-500 mt-1">{c.date}</p>
                    <p className="text-sm text-gray-700 mt-3">
                      {truncateDescription(c.description, 30)}
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      <p>
                        <strong>Location:</strong> {c.location}
                      </p>
                      <p>
                        <strong>Email:</strong> {c.email}
                      </p>
                    </div>
                    {hasProgress && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-700 mb-1">
                          Progress: {Math.round(c.progress)}%
                        </p>

                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
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
                      className="text-sm text-green-600 mt-4 hover:underline"
                    >
                      {expandedRows.includes(c.id) ? 'Hide details' : 'View details'}
                    </button>
                    {expandedRows.includes(c.id) && (
                      <div className="mt-3 text-sm text-gray-700 border-t pt-3">
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
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-green-600">Date</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-green-600">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-green-600">Email</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-green-600">Subject</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-green-600">Location</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-green-600">Status</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-green-600">Details</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {complaintsData.slice(0, visibleCount).map((c) => (
                    <React.Fragment key={c.id}>
                      <tr className="hover:bg-gray-50">
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
                          className="px-4 py-2 text-sm text-green-600 flex items-center gap-2 cursor-pointer"
                          onClick={() => toggleRow(c.id)}
                        >
                          <FaRegEye />
                        </td>
                      </tr>

                      {/* Description row */}
                      {expandedRows.includes(c.id) && (
                        <tr className="bg-gray-50">
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
                      <p className="font-semibold text-green-600">{c.name}</p>
                      <p className="text-sm text-green-600">{c.subject}</p>
                    </div>
                    <div className="text-green-600 font-bold">
                      {expandedRows.includes(c.id) ? '-' : '+'}
                    </div>
                  </div>
                  {expandedRows.includes(c.id) && (
                    <div className="px-4 py-3 border-t border-gray-200 text-sm text-green-600 space-y-1">
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
              className="bg-green-600 text-white px-4 py-2 rounded-md"
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
