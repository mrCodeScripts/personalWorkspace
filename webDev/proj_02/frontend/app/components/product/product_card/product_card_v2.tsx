"use client";

import Image, { StaticImageData } from "next/image";
import { ShoppingCart, Star, Percent } from "lucide-react";

type Product = {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  originalPrice: number;
  discount: number;
};

export default function ProductCardV2({ product }: { product: Product }) {
  return (
    <div className="bg-base-100 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
      {/* Product Image */}
      <div className="relative w-full h-56 bg-base-300 flex items-center justify-center">
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 right-3 z-10 bg-[#1f2937] px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg animate-bounce text-[#fbbf24]">
            <Percent size={14} strokeWidth={3} width={20} height={20}/>

            <span className="text-xs font-bold">{product.discount}% OFF</span>
          </div>
        )}

        <Image
          src={`/assets/sampleProducts/${product.image}`}
          alt={product.name}
          fill
          className="object-contain p-3"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-700 line-clamp-1">
          {product.name}
        </h3>

        {/* Ratings */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < product.rating
                  ? "text-[#fbbf24] stroke-3"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          {/* Original Price */}
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}

          {/* Final Price */}
          <span className="font-bold text-base-content text-[#16a34a]!">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Add To Cart */}
        <button className="mt-3 border-2 border-[#f43f5e] text-[#f43f5e] py-3 px-5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#f43f5e] hover:text-[#ffffff] transition-all duration-200 text-sm font-semibold">
          <ShoppingCart size={18} strokeWidth={3} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
