"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Registering:\nName: ${name}\nEmail: ${email}\nPassword: ${password}`);
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
            Register
          </h1>

          <form className="space-y-3" onSubmit={handleRegister}>

            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
              Register
            </button>
          </form>

          <p className="text-xs text-center text-gray-500">
            Already have an account?{" "}
            <Link href="/projectExamples/publicMarket/auth/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
