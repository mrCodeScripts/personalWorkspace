import { ReactNode } from "react";
import Link from "next/link";
import { Home, ShoppingCart, User } from "lucide-react";

export default function PubMarketLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">

      {/* Navbar */}
      <header className="bg-base-100 shadow-md p-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          🛒 PubMarket
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <Link href="/pubMarketComp/cart">
            <ShoppingCart size={22} />
          </Link>
          <Link href="/pubMarketComp/account">
            <User size={22} />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-3">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-base-100 shadow-t p-2 flex justify-around md:hidden">
        <Link href="/" className="flex flex-col items-center text-gray-500 hover:text-primary">
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/pubMarketComp/products" className="flex flex-col items-center text-gray-500 hover:text-primary">
          <Home size={20} />
          <span className="text-xs">Products</span>
        </Link>
        <Link href="/pubMarketComp/cart" className="flex flex-col items-center text-gray-500 hover:text-primary">
          <ShoppingCart size={20} />
          <span className="text-xs">Cart</span>
        </Link>
        <Link href="/pubMarketComp/account" className="flex flex-col items-center text-gray-500 hover:text-primary">
          <User size={20} />
          <span className="text-xs">Account</span>
        </Link>
      </nav>
    </div>
  );
}
