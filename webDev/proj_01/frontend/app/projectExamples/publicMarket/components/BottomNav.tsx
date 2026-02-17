"use client";

import Link from "next/link";
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";

export default function BottomNav() {
  return (
    <div className="btm-nav btm-nav-md bg-base-100 border-t z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>

      <Link href="/projectExamples/publicMarket/home" className="text-primary" aria-label="Home">
        <Home size={20} />
        <span className="btm-nav-label text-xs">Home</span>
      </Link>

      <Link href="/projectExamples/publicMarket/products" aria-label="Products">
        <ShoppingBag size={20} />
        <span className="btm-nav-label text-xs">Products</span>
      </Link>

      <Link href="/projectExamples/publicMarket/cart" aria-label="Cart">
        <ShoppingCart size={20} />
        <span className="btm-nav-label text-xs">Cart</span>
      </Link>

      <Link href="/projectExamples/publicMarket/account" aria-label="Account">
        <User size={20} />
        <span className="btm-nav-label text-xs">Account</span>
      </Link>

    </div>
  );
}
