"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";

// icons
import { Mail, Lock, ArrowRight } from "lucide-react";

// components
import Input from "@/components/common/Input";
import BrandButton from "@/components/common/Button";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// API login function
const loginApi = async (data) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("Login Success:", data);
      setMessage("Login successful ✅");
    },
    onError: (error) => {
      console.error("Login Error:", error.message);
      setMessage(error.message);
    },
  });

  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    setMessage("");
    mutation.mutate(data);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Side (Login Form) */}
      <div className="flex h-full w-1/2 items-center justify-center bg-[#FFF]">
        <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-lg">
          <h2 className="mb-10 text-4xl font-semibold text-[#037DFC]">
            Welcome back
          </h2>

          {/* Message */}
          {message && (
            <p
              className={`mb-6 p-4 text-sm font-light border-l-4 shadow ${
                mutation.isError
                  ? "text-red-500 border-l-red-500 bg-red-50"
                  : "text-green-600 border-l-green-600 bg-green-50"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              icon={<Mail size={20} />}
              type="email"
              placeholder="Email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              icon={<Lock size={20} />}
              type="password"
              placeholder="Password"
              {...register("password")}
              error={errors.password?.message}
            />

            <p className="text-end text-xs font-thin my-5 text-gray-500">
              Forgot password?
            </p>

            <BrandButton
              text={mutation.isLoading ? "Logging in..." : "Login"}
              Icon={ArrowRight}
              type="submit"
              disabled={mutation.isLoading}
            />
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/register" className="text-[#172D8A] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side (Image) */}
      <div className="h-screen w-1/2 relative bg-[#030F59] flex flex-col items-center justify-center text-white">
        <div className="relative w-2/4 h-2/4">
          <Image
            src="/database.png"
            alt="Login Background"
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
  );
} 