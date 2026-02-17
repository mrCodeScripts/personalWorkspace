"use client";

import { Trash2 } from "lucide-react";

export default function CartPage() {
  return (
    <div className="space-y-4 pb-36">
      <h1 className="text-xl font-bold">My Cart</h1>

      <div className="bg-base-100 p-4 rounded-lg text-center">
        <p className="text-gray-400 mb-4">Your cart is empty</p>
        <a href="/projectExamples/publicMarket2/products" className="btn btn-primary btn-sm">
          Continue Shopping
        </a>
      </div>

      <div className="bg-base-100 p-4 rounded-lg space-y-3">
        <h2 className="font-semibold">Cart Summary</h2>
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>₱0</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping:</span>
          <span>₱0</span>
        </div>
        <div className="divider my-2"></div>
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>₱0</span>
        </div>
        <button className="btn btn-primary w-full" disabled>
          Checkout
        </button>
      </div>
    </div>
  );
}
