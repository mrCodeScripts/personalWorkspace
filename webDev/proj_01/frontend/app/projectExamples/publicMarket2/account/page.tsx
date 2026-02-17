"use client";

import { Settings, LogOut } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="space-y-4 pb-24">
      <h1 className="text-xl font-bold">My Account</h1>

      {/* Profile Card */}
      <div className="card bg-base-100 shadow-sm p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl">
            👤
          </div>
          <div>
            <p className="font-semibold text-lg">John Doe</p>
            <p className="text-sm text-gray-500">john@example.com</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        <button className="w-full btn btn-ghost justify-start gap-3">
          <Settings size={20} className="text-primary" />
          <span>Settings</span>
        </button>
        <button className="w-full btn btn-outline btn-error justify-start gap-3">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Auth Links */}
      <div className="bg-base-100 p-4 rounded-lg text-center space-y-2">
        <p className="text-sm text-gray-600">Not logged in?</p>
        <a href="/projectExamples/publicMarket2/auth/login" className="btn btn-primary btn-sm w-full">
          Login
        </a>
        <a href="/projectExamples/publicMarket2/auth/register" className="btn btn-outline btn-sm w-full">
          Register
        </a>
      </div>
    </div>
  );
}
