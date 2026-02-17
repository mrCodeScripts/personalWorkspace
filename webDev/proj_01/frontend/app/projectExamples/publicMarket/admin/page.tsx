import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-base-200">

      {/* Sidebar */}
      <div className="w-48 bg-base-100 shadow-md p-3 flex flex-col gap-2">

        <h2 className="text-lg font-bold mb-3 text-primary">Admin Panel</h2>

        <Link href="/projectExamples/publicMarket/admin/products" className="btn btn-ghost w-full justify-start">
          Products
        </Link>

        <Link href="/projectExamples/publicMarket/admin/users" className="btn btn-ghost w-full justify-start">
          Users
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">{children}</div>
    </div>
  );
}
