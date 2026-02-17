"use client";

import { MapPin, CreditCard, Wallet } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="space-y-4">

      {/* Page Title */}
      <h1 className="text-lg font-bold">
        Checkout
      </h1>

      {/* Shipping Address */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-3">

          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            <h2 className="font-semibold text-sm">
              Delivery Address
            </h2>
          </div>

          <div className="text-sm mt-2">
            <p className="font-medium">
              Juan Dela Cruz
            </p>
            <p className="text-gray-500 text-xs">
              0912-345-6789
            </p>
            <p className="text-gray-500 text-xs">
              Manila, Philippines
            </p>
          </div>

          <button className="btn btn-link btn-xs p-0 mt-1">
            Change Address
          </button>

        </div>
      </div>

      {/* Order Items */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-3">

          <h2 className="font-semibold text-sm mb-2">
            Order Items
          </h2>

          {/* Item */}
          <div className="flex gap-3 items-center border-b pb-2 mb-2">

            <img
              src="https://via.placeholder.com/80"
              alt="product"
              className="w-16 h-16 rounded-md object-cover"
            />

            <div className="flex-1">

              <p className="text-sm font-medium line-clamp-1">
                Fresh Rice 5kg
              </p>

              <p className="text-xs text-gray-500">
                Qty: 1
              </p>

              <p className="text-sm text-primary font-bold">
                ₱250
              </p>

            </div>

          </div>

          {/* Item */}
          <div className="flex gap-3 items-center">

            <img
              src="https://via.placeholder.com/80"
              alt="product"
              className="w-16 h-16 rounded-md object-cover"
            />

            <div className="flex-1">

              <p className="text-sm font-medium line-clamp-1">
                Organic Bananas
              </p>

              <p className="text-xs text-gray-500">
                Qty: 2
              </p>

              <p className="text-sm text-primary font-bold">
                ₱240
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* Payment Method */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-3">

          <h2 className="font-semibold text-sm mb-2">
            Payment Method
          </h2>

          <div className="space-y-2">

            {/* GCash */}
            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="radio"
                name="payment"
                className="radio radio-primary radio-sm"
                defaultChecked
              />

              <Wallet size={18} />

              <span className="text-sm">
                GCash / E-Wallet
              </span>

            </label>

            {/* Card */}
            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="radio"
                name="payment"
                className="radio radio-primary radio-sm"
              />

              <CreditCard size={18} />

              <span className="text-sm">
                Credit / Debit Card
              </span>

            </label>

            {/* COD */}
            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="radio"
                name="payment"
                className="radio radio-primary radio-sm"
              />

              <span className="text-lg">💵</span>

              <span className="text-sm">
                Cash on Delivery
              </span>

            </label>

          </div>

        </div>
      </div>

      {/* Order Summary */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-3 space-y-1 text-sm">

          <h2 className="font-semibold mb-1">
            Order Summary
          </h2>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₱490</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>₱50</span>
          </div>

          <div className="flex justify-between font-bold text-primary">
            <span>Total</span>
            <span>₱540</span>
          </div>

        </div>
      </div>

      {/* Place Order */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-3">

        <button className="btn btn-primary w-full rounded-full">
          Place Order
        </button>

      </div>

    </div>
  );
}
