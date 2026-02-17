"use client";

import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-3">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">🏪 PubMarket2</h1>
          <h2 className="text-2xl font-semibold">Register</h2>
          <p className="text-gray-500 text-sm mt-1">Create a new account</p>
        </div>

        <form className="space-y-4 bg-base-100 p-6 rounded-lg shadow-sm">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Full Name
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
              <User size={18} className="text-gray-400" />
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email Address
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
              <Mail size={18} className="text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
              <Lock size={18} className="text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm_password" className="block text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
              <Lock size={18} className="text-gray-400" />
              <input
                id="confirm_password"
                type="password"
                placeholder="••••••••"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Register Button */}
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/projectExamples/publicMarket2/auth/login" className="text-primary font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
