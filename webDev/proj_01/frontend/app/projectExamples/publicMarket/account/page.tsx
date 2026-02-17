"use client";

import { User, CreditCard, MapPin, ShoppingBag, Settings, LogOut } from "lucide-react";

export default function AccountPage() {
  const user = {
    name: "Juan Dela Cruz",
    email: "juan@email.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const menuItems = [
    { name: "My Orders", icon: ShoppingBag, href: "#" },
    { name: "Addresses", icon: MapPin, href: "#" },
    { name: "Payment Methods", icon: CreditCard, href: "#" },
    { name: "Settings", icon: Settings, href: "#" },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-4 space-y-4">

      {/* Profile Card */}
      <div className="card bg-base-100 shadow-md p-4 flex items-center gap-4 rounded-lg">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-lg">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Account Menu */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 p-3 bg-base-100 rounded-lg shadow-sm hover:bg-base-200"
            >
              <Icon size={20} className="text-primary" />
              <span className="font-medium text-sm">{item.name}</span>
            </a>
          );
        })}
      </div>

      {/* Logout */}
      <button className="btn btn-outline btn-error w-full mt-4">
        <LogOut size={18} className="mr-2" /> Logout
      </button>
    </div>
  );
}
