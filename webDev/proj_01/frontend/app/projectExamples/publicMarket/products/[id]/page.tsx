"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { products } from "../../data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);

  const product = products.find((p) => p.id === productId);

  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="p-4 text-center text-gray-500">
        Product not found.
      </div>
    );
  }

  const increaseQty = () => setQty((prev) => prev + 1);
  const decreaseQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="space-y-4 p-3">

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg"
      />

      {/* Product Info */}
      <div className="space-y-1">
        <h1 className="text-lg font-bold">{product.name}</h1>
        <p className="text-primary font-semibold text-sm">₱{product.price}</p>
        <p className="text-gray-500 text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis.
        </p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <button className="btn btn-outline btn-sm" onClick={decreaseQty}>
          -
        </button>
        <span className="text-sm">{qty}</span>
        <button className="btn btn-outline btn-sm" onClick={increaseQty}>
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        className="btn btn-primary w-full rounded-full"
        onClick={() => alert(`Added ${qty} ${product.name}(s) to cart`)}
      >
        Add to Cart
      </button>

    </div>
  );
}
