'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/common/Button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL

export default function NariShaktiPage() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    husband_father_name: '',
    mother_name: '',
    address: '',
    voter_id: '',
    occupation: '',
    mobile_number: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  // OTP states
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(0)
  const [otpVerified, setOtpVerified] = useState(false)

  /* 🔄 input change */
  const handleChange = (e) => {
    console.log(e, formData)
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /* ⏳ OTP countdown */
  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timer])

  /* 📱 BD phone validation */
  const isValidPhone = (number) => /^01[3-9]\d{8}$/.test(number)

  /* 📩 Send OTP */
  const handleSendOtp = async () => {
    if (!isValidPhone(formData.mobile_number)) {
      toast.error('ভ্যালিড মোবাইল নম্বর দিন')
      return
    }

    try {
      const res = await fetch(`${API_BASE}/api/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile_number: formData.mobile_number }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success('OTP পাঠানো হয়েছে')
        setShowOtpInput(true)
        setOtp('')
        setOtpVerified(false)
        setTimer(300)
      } else {
        toast.error(data.message || 'OTP পাঠানো যায়নি')
      }
    } catch {
      toast.error('সার্ভার সমস্যা')
    }
  }

  /* ✅ Verify OTP */
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error('OTP লিখুন')
      return
    }

    try {
      const res = await fetch(`${API_BASE}/api/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile_number: formData.mobile_number,
          otp,
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success('OTP Verified')
        setOtpVerified(true)
        setShowOtpInput(false)
        setTimer(0)
      } else {
        toast.error(data.message || 'ভুল OTP')
      }
    } catch {
      toast.error('সার্ভার সমস্যা')
    }
  }

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  /* 🔁 Reset */
  const handleReset = () => {
    setFormData({
      name: '',
      age: '',
      husband_father_name: '',
      mother_name: '',
      address: '',
      voter_id: '',
      occupation: '',
      mobile_number: '',
    })
    setOtp('')
    setTimer(0)
    setOtpVerified(false)
    setShowOtpInput(false)
    setMessage(null)
  }

  /* 📤 Submit */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!otpVerified) {
      toast.error('আগে OTP যাচাই করুন')
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch(`${API_BASE}/api/woman-empower-card`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(data.message || 'সফলভাবে জমা হয়েছে')
        handleReset()
      } else {
        toast.error(data.message || 'সমস্যা হয়েছে')
      }
    } catch {
      toast.error('Submission failed')
    } finally {
      setLoading(false)
    }
  }
  const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL
  console.log('API BASE 👉', API_BASE)

  return (
    <div className="px-4 py-10">
      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Card visual */}
        <div className="bg-white/80 border border-[#c43d74]/20 rounded-3xl shadow-xl w-full lg:w-1/2 flex justify-center items-center p-4">
          <img
            src="/narisokti.jpeg"
            alt="নারীশক্তি কার্ড"
            className="max-w-full h-auto rounded-3xl"
          />
        </div>

        {/* Registration form */}
        <div className="bg-white/90 backdrop-blur border border-[#c43d74]/30 rounded-3xl shadow-xl p-6 md:p-8 w-full lg:w-1/2 flex flex-col">
          <p className="text-sm uppercase text-[#b12462] font-semibold text-center">
            নারীশক্তি কার্ড রেজিস্ট্রেশন
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#7a1245] text-center mt-2">
            আপনার তথ্য পূরণ করুন
          </h1>
          <p className="text-sm md:text-base text-brandGray/80 text-center mt-3 leading-relaxed">
            সুরক্ষিত ও সুবিধাভোগী হতে প্রয়োজনীয় তথ্য জমা দিন। জমাকৃত তথ্য শুধু
            কমিউনিটি সহায়তা ও যাচাইয়ের উদ্দেশ্যে ব্যবহৃত হবে।
          </p>

          {message && (
            <p
              className={`mt-3 text-center font-medium ${
                message.type === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message.text}
            </p>
          )}

          <form className="mt-6 space-y-1" onSubmit={handleSubmit}>
            <label className="flex flex-col text-sm font-medium text-[#7a1245]">
              নাম
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="আপনার পূর্ণ নাম লিখুন"
                className="mt-1 rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80"
                required
              />
            </label>

            {/* <label className="flex flex-col text-sm font-medium text-[#7a1245]">
              জন্ম তারিখ
              <input
                type="date"
                name="age"
                min="10"
                value={formData.age}
                onChange={handleChange}
                placeholder="জন্ম তারিখ লিখুন"
                className="mt-1 w-full rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80"
                required
              />
            </label> */}

            <label className="flex flex-col text-sm font-medium text-[#7a1245]">
              জন্ম তারিখ
              <input
                type="text"
                name="age"
                value={formData.age}
                placeholder="mm-dd-yyyy"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80"
                required
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-[#7a1245]">
              স্বামী/ পিতার নাম
              <input
                type="text"
                name="husband_father_name"
                value={formData.husband_father_name}
                onChange={handleChange}
                placeholder="স্বামী বা পিতার নাম লিখুন"
                className="mt-1 rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80"
                required
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-[#7a1245]">
              মাতার নাম
              <input
                type="text"
                name="mother_name"
                value={formData.mother_name}
                onChange={handleChange}
                placeholder="মাতার নাম লিখুন"
                className="mt-1 rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80"
                required
              />
            </label>

          {/* MOBILE + OTP */}
<div className="flex items-end gap-4">
  {/* Mobile Number */}
  <div className="flex-1">
    <label className="flex flex-col text-sm font-medium text-[#7a1245]">
      মোবাইল নম্বর
      <input
        type="tel"
        name="mobile"
        value={formData.mobile_number}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            mobile_number: e.target.value,
          }))
        }
        placeholder="মোবাইল নম্বর"
        required
        className="w-full p-2 rounded border border-[#c43d74]/40 bg-white text-brandGray"
        pattern="01[3-9][0-9]{8}"
      />
    </label>
  </div>

  {/* OTP Button */}
  {!otpVerified && (
    <div className="mb-[2px]">
      <Button type="button" onClick={handleSendOtp}>
        OTP
      </Button>
    </div>
  )}
</div>

{/* OTP INPUT AREA */}
{showOtpInput && !otpVerified && (
  <div className="mt-4">
    {timer > 0 ? (
      <>
        <div className="flex items-end gap-4 mb-2">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP লিখুন"
            className="flex-1 p-2 rounded border border-[#c43d74]/40 bg-white text-brandGray"
          />

          <Button type="button" onClick={handleVerifyOtp}>
            Verify
          </Button>
        </div>

        <p className="text-sm text-gray-600">
          OTP মেয়াদ: {formatTime(timer)}
        </p>
      </>
    ) : (
      <div className="flex justify-end">
        <Button type="button" onClick={handleSendOtp}>
          Resend OTP
        </Button>
      </div>
    )}
  </div>
)}


            <label className="flex flex-col text-sm font-medium text-[#7a1245]">
              জাতীয় পরিচয় পত্রের নাম্বার
              <textarea
                name="voter_id"
                rows={1}
                value={formData.voter_id}
                onChange={handleChange}
                placeholder="ভোটার আইডি কার্ড নাম্বার"
                className="mt-1 rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80 resize-none"
                required
              />
            </label>
            <label className="flex flex-col text-sm font-medium text-[#7a1245]">
              পেশা
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="পেশা লিখুন"
                className="mt-1 rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80"
                required
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-[#7a1245]">
              ঠিকানা
              <textarea
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                placeholder="বর্তমান বাসার ঠিকানা"
                className="mt-1 rounded-lg border border-[#c43d74]/40 px-3 py-2 text-brandGray focus:outline-none focus:ring-2 focus:ring-[#c43d74]/60 bg-white/80 resize-none"
                required
              />
            </label>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-[#b12462] hover:bg-[#7a1245] text-white font-semibold px-5 py-3 rounded-xl shadow-md transition disabled:opacity-50"
              >
                {loading ? 'জমা হচ্ছে...' : 'রেজিস্ট্রেশন করুন'}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto bg-white text-[#7a1245] font-semibold px-5 py-3 rounded-xl border border-[#c43d74]/50 shadow-sm hover:bg-[#ffe6f0] transition"
              >
                রিসেট
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
