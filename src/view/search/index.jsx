"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchPopup() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // there will be API  
  const data = [
    "Team Management",
    "Sales Dashboard",
    "Lead Tracker",
    "Analytics Report",
    "Admin Settings",
    "User Permissions",
    "Project Timeline",
    "Marketing Campaign",
  ];

  // Search Logic,, filtaring ruselt 
  const results = data.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative text-black">
      {/* ======= Search Icon ======= */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-all"
      >
        <Search size={20} />
      </button>

      {/* ======= Popup Panel ======= */}
      <AnimatePresence>
        {open && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "linear" }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setOpen(false)}
            />

            {/* Top-down Search Popup */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl bg-white shadow-2xl z-50 rounded-b-2xl p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Search
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Search Results */}
              <div className="mt-4 max-h-64 overflow-y-auto">
                {query ? (
                  results.length > 0 ? (
                    <ul className="space-y-2">
                      {results.map((item, index) => (
                        <li
                          key={index}
                          className="p-3 border rounded-md hover:bg-gray-100 cursor-pointer text-gray-800"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-center py-4">
                      No results found.
                    </p>
                  )
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Start typing to search...
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
