"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";

import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-2">

      {/* Logo */}
      <div className="flex-none">
        <Link
          href="/pubMarketComp"
          className="text-lg font-bold text-primary"
        >
          🛒 PubMarket
        </Link>
      </div>

      {/* Search */}
      <div className="flex-1 mx-2">
        <SearchBar />
      </div>

      {/* Actions */}
      <div className="flex-none gap-1">

        <Link href="/pubMarketComp/cart" className="btn btn-ghost btn-sm">
          <ShoppingCart size={20} />
        </Link>

        <Link href="/pubMarketComp/account" className="btn btn-ghost btn-sm">
          <User size={20} />
        </Link>

      </div>
    </div>
  );
}

