'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Lock, ArrowRight } from 'lucide-react'

import Input from '@/components/common/Input'
import BrandButton from '@/components/common/Button'

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export default function LoginPage({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log('Login success:', data)
    onLogin?.() // parent callback
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Side (Login Form) */}
      <div className="flex h-full w-1/2 items-center justify-center bg-white">
        <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-lg">
          <h2 className="mb-10 text-4xl font-semibold text-blue-600">
            Welcome back
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              icon={<Mail size={20} />}
              type="email"
              placeholder="Email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              icon={<Lock size={20} />}
              type="password"
              placeholder="Password"
              {...register('password')}
              error={errors.password?.message}
            />

            <p className="text-end text-xs font-thin my-5 text-gray-500 cursor-pointer">
              Forgot password?
            </p>

            <BrandButton
              text="Login"
              icon={<ArrowRight size={20} />}
              type="submit"
            />
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link href="/register" className="text-blue-800 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side (Image) */}
      <div className="h-screen w-1/2 relative bg-blue-900 flex flex-col items-center justify-center text-white">
        <div className="relative w-2/4 h-2/4">
          <Image
            src="/database.png"
            alt="Login Background Image nai"
            fill
            className="object-contain object-center"
          />
        </div>

        <div className="mt-1 flex gap-6 text-sm font-semibold">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/payment-policy" className="hover:underline">
            Payment Policy
          </Link>
          <Link href="/faq" className="hover:underline">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  )
}
