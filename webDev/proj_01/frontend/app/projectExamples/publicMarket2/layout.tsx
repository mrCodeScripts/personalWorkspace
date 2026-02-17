import { ReactNode } from "react";
import Link from "next/link";
import { Home, ShoppingCart, User, Menu } from "lucide-react";

export default function PublicMarket2Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Navbar */}
      <header role="banner" className="sticky top-0 z-30 bg-base-100 shadow-md p-3">
        <div className="flex items-center justify-between max-w-screen-sm mx-auto w-full">
          <Link
            href="/projectExamples/publicMarket2"
            className="text-xl font-bold text-primary"
            aria-label="Go to home"
          >
            🏪 PubMarket2
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <Link href="/projectExamples/publicMarket2/cart" aria-label="Open cart">
              <ShoppingCart size={22} />
            </Link>
            <Link href="/projectExamples/publicMarket2/account" aria-label="Open account">
              <User size={22} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-3 pb-24 max-w-screen-sm mx-auto w-full">{children}</main>

      {/* Bottom Navigation */}
      <nav
        role="navigation"
        aria-label="Bottom navigation"
        className="fixed bottom-0 left-0 w-full bg-base-100 shadow-md p-2 flex justify-around md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <Link
          href="/projectExamples/publicMarket2"
          className="flex flex-col items-center text-gray-500 hover:text-primary"
          aria-label="Home"
        >
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/projectExamples/publicMarket2/products"
          className="flex flex-col items-center text-gray-500 hover:text-primary"
          aria-label="Products"
        >
          <Menu size={20} />
          <span className="text-xs">Products</span>
        </Link>
        <Link
          href="/projectExamples/publicMarket2/cart"
          className="flex flex-col items-center text-gray-500 hover:text-primary"
          aria-label="Cart"
        >
          <ShoppingCart size={20} />
          <span className="text-xs">Cart</span>
        </Link>
        <Link
          href="/projectExamples/publicMarket2/account"
          className="flex flex-col items-center text-gray-500 hover:text-primary"
          aria-label="Account"
        >
          <User size={20} />
          <span className="text-xs">Account</span>
        </Link>
      </nav>
    </div>
  );
}
