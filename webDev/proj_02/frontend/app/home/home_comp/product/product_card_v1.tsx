"use client";

import Image, { StaticImageData } from "next/image";
import { ShoppingCart, Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-base-100 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      {/* Product Image */}
      <div className="relative w-full h-56 bg-base-300 flex items-center justify-center">
        <Image
          src={`/assets/sampleProducts/${product.image}`}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-base-content line-clamp-1">
          {product.name}
        </h3>

        {/* Ratings */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < product.rating ? "text-[#fbbf24] fill-[#fbbf24]" : "text-gray-300"}
            />
          ))}
        </div>

        <p className="text-base font-bold text-base-content mt-1">
          $ {product.price.toFixed(2)}
        </p>

        {/* Add to Cart */}
        <button className="mt-3 bg-primary text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-[#f43f5e] transition-colors duration-200 text-sm">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
