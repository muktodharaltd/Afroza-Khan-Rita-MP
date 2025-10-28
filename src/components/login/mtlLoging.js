'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Lock } from 'lucide-react'

import AuthButton from '../common/Button'
import Input from '../common/Input'
import AuthTitle from '../common/AuthTitle'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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
    <div className="flex items-center justify-center min-h-screen font-inter bg-gray-50">
      <div className="space-y-4 sm:w-md w-full px-4 md:px-0">
        {/* Logo */}
        <div className="w-[200px] mx-auto">
          <Image
            src="/hr360-logo.png"
            alt="logo"
            width={200}
            height={60}
            className="object-cover"
          />
        </div>

        {/* Title */}
        <div>
          <AuthTitle>Login Here</AuthTitle>
          <p className="text-neutral-600 text-sm">
            No Account?{' '}
            <Link
              href="/auth/register"
              className="text-blue-500 font-medium underline"
            >
              Please Register
            </Link>
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 mt-3 w-full"
        >
          <Input
            label="Email"
            icon={<Mail size={20} />}
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            icon={<Lock size={20} />}
            type="password"
            placeholder="Enter your password"
            {...register('password')}
            error={errors.password?.message}
          />
          <AuthButton text="login" type="submit"></AuthButton>
        </form>

        {/* Forgot password */}
        <div className="flex justify-end">
          <Link
            href="#"
            className="text-neutral-600 text-sm hover:underline transition-all duration-500"
          >
            Forgot password or account?
          </Link>
        </div>

        {/* Footer */}
        <div className="flex items-center my-10 justify-center gap-3">
          <p className="text-neutral-500 text-sm tracking-tight">
            Sister Concern By
          </p>
          <div className="w-[100px]">
            <Image
              src="/muktodhara-logo.png"
              alt="mtl logo"
              width={100}
              height={40}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
