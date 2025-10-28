"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"
import Button from "@/components/common/Button";

export default function SidebarPopup() {
  const [open, setOpen] = useState(false);

  return (
    <div className=" relative">
      {/* ======= Settings Icon ======= */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-all"
      >
        <Settings size={20} />
      </button>

      {/* ======= Sidebar ======= */}
      <AnimatePresence>
        {open && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "linear" }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setOpen(false)}
            />

            {/* Sidebar Panel */}
           <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-10 w-[25%] h-screen bg-white shadow-2xl z-50 flex flex-col "
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  Signals
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center items-center h-full text-center p-6">
              <Image src="/bell.jpg" alt="logo image" height="250" width="250" />
                <p className="text-black text-xl mt-10 pl-9 pr-9">Manage Signals</p> 
                <p className="text-gray-500 p-3">Receive real-time notifications across applications </p> 
                <Button text="Configure"/>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
