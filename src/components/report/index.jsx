"use client";
import React, { useState } from "react";
import complaintsData from "./report.json";
import Button from "../common/Button"

export default function ComplaintsTable() {
  const [visibleCount, setVisibleCount] = useState(7);
  const [expandedRows, setExpandedRows] = useState([]);

  const handleViewAll = () => {
    setVisibleCount(complaintsData.length);
  };

  const toggleRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  const truncateDescription = (text, wordLimit = 40) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className=" max-w-7xl mx-auto ">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
        প্রাপ্ত অভিযোগ
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden ">
          <thead className="bg-gray-200">
            <tr>
              
              <th className="py-2 px-3 text-left   text-green-600">Name</th>
              <th className="py-2 px-3 text-left   text-green-600">Email</th>
              <th className="py-2 px-3 text-left   text-green-600">Subject</th>
              <th className="py-2 px-3 text-left   text-green-600">Date</th>
              <th className="py-2 px-3 text-left   text-green-600">Location</th>
              <th className="py-2 px-3 text-left   text-green-600">Description</th>
              <th className="py-2 px-3 text-left   text-green-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-green-600">
            {complaintsData.slice(0, visibleCount).map((complaint) => (
              <tr key={complaint.id} className="hover:bg-gray-50">
                
                <td className="py-2 px-3 text-sm">{complaint.name}</td>
                <td className="py-2 px-3 text-sm">{complaint.email}</td>
                <td className="py-2 px-3 text-sm">{complaint.subject}</td>
                <td className="py-2 px-3 text-sm">{complaint.date}</td>
                <td className="py-2 px-3 text-sm">{complaint.location}</td>
                <td className="py-2 px-3 text-sm">{truncateDescription(complaint.description, 40)}</td>
                <td className="py-2 px-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                      complaint.status === "Resolved"
                        ? "bg-green-500"
                        : complaint.status === "In Progress"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {complaint.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden flex flex-col space-y-4">
        {complaintsData.slice(0, visibleCount).map((complaint) => (
          <div
            key={complaint.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div
              className="flex justify-between items-center px-4 py-3 cursor-pointer"
              onClick={() => toggleRow(complaint.id)}
            >
              <div>
                <p className="font-semibold  text-green-600">{complaint.name}</p>
                <p className="text-sm  text-green-600">{complaint.subject}</p>
              </div>
              <div className="text-green-600 font-bold">
                {expandedRows.includes(complaint.id) ? "-" : "+"}
              </div>
            </div>
            {expandedRows.includes(complaint.id) && (
              <div className="px-4 py-3 border-t border-gray-200 text-sm text-green-600 space-y-1">
                <p ><strong>Email:</strong> {complaint.email}</p>
                <p><strong>Date:</strong> {complaint.date}</p>
                <p><strong>Location:</strong> {complaint.location}</p>
                <p><strong>Description:</strong> {complaint.description}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                      complaint.status === "Resolved"
                        ? "bg-green-500"
                        : complaint.status === "In Progress"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {complaint.status}
                  </span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View All Button */}
      {visibleCount < complaintsData.length && (
        <div className="text-center mt-6">
          <Button
            onClick={handleViewAll}
            text='View All'
          >
          
          </Button>
        </div>
      )}
    </div>
  );
}
