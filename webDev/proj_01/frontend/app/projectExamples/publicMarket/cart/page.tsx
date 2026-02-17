"use client";

import { useState } from "react";
import { products as sampleProducts } from "../data/products";
import { Trash2 } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([
    { ...sampleProducts[0], qty: 1 },
    { ...sampleProducts[1], qty: 2 },
  ]);

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="space-y-4 pb-24">

      {/* Page Title */}
      <h1 className="text-lg font-bold">My Cart</h1>

      {/* Cart Items */}
      {cart.length === 0 && (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      )}

      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-2 bg-base-100 shadow-sm rounded-lg"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />

            {/* Info */}
            <div className="flex-1">
              <p className="text-sm font-medium line-clamp-2">{item.name}</p>
              <p className="text-xs text-gray-500">₱{item.price}</p>

              {/* Quantity Control */}
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="btn btn-sm btn-outline btn-square"
                >
                  -
                </button>

                <span className="text-sm w-6 text-center">{item.qty}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="btn btn-sm btn-outline btn-square"
                >
                  +
                </button>
              </div>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.id)}
              className="btn btn-ghost btn-sm"
            >
              <Trash2 size={18} className="text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="card bg-base-100 shadow-sm p-3">
          <div className="flex justify-between text-sm font-semibold">
            <span>Subtotal</span>
            <span>₱{subtotal}</span>
          </div>

          <button
            className="btn btn-primary w-full mt-3 rounded-full"
            onClick={() => alert("Proceed to Checkout")}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
