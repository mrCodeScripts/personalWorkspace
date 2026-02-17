"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Logging in with:\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 bg-base-200">

      <div className="max-w-md mx-auto w-full">

        {/* Logo */}
        <div className="text-center mb-6">
          <span className="text-3xl font-bold text-primary">🛒 PubMarket</span>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-md p-6 rounded-lg space-y-4">

          <h1 className="text-xl font-semibold text-center">
            Login
          </h1>

          <form className="space-y-3" onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn btn-primary w-full rounded-full"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-center text-gray-500">
            Don’t have an account?{" "}
            <Link href="/pubMarketComp/auth/register" className="text-primary font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
