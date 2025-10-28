'use client'
import React, { useRef } from 'react'
import { Calendar } from 'lucide-react'

export default function CalendarWithAIIcon() {
  const inputRef = useRef(null)
  const openCalendar = () => {
    inputRef.current.showPicker() // pick real date from browser
  }
  return (
    <div className=" bottom-0">
      <button onClick={openCalendar} className=" p-2 rounded-md fixde bottom-0 hover:bg-gray-700">
        <Calendar size={20} />
      </button>
      {/* Hidden Date Input */}
      <input ref={inputRef} type="date" className="hidden " />
    </div>
  )
}
