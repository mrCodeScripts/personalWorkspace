"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";

import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-2">

      <div className="max-w-screen-sm mx-auto w-full flex items-center gap-2">

        {/* Logo */}
        <div className="flex-none">
          <Link
            href="/pubMarketComp"
            className="text-lg font-bold text-primary"
            aria-label="Go to PubMarket home"
          >
            🛒 PubMarket
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1">
          <SearchBar />
        </div>

        {/* Actions */}
        <div className="flex-none gap-1 flex items-center">

          <Link href="/pubMarketComp/cart" className="btn btn-ghost btn-sm" aria-label="Open cart">
            <ShoppingCart size={20} />
          </Link>

          <Link href="/pubMarketComp/account" className="btn btn-ghost btn-sm" aria-label="Open account">
            <User size={20} />
          </Link>

        </div>
      </div>
    </div>
  );
}

