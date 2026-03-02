"use client";

import Image, { StaticImageData } from "next/image";
import { ShoppingCart, Star, Percent } from "lucide-react";
import ImageSliderV1 from "../product_sliders/product_slider_v1";

type Product = {
  id: number;
  name: string;
//   image: string;
  rating: number;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
};

// const product = {
//   name: "Running Sneakers",
//   images: [
//     "/assets/sampleProducts/shoe1.png",
//     "/assets/sampleProducts/shoe2.png",
//     "/assets/sampleProducts/shoe3.png",
//   ],
//   rating: 4,
//   price: 39.99,
//   originalPrice: 59.99,
//   discount: 33,
// };

export default function ProductCardV3({ product }: { product: Product }) {
  return (
    <div className="bg-base-100 shadow-lg rounded-none overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col border-[1px] border-gray-200">
      {/* ================= IMAGE SLIDER ================= */}
      <ImageSliderV1 images={product.images} discount={product.discount} />

      {/* ================= PRODUCT INFO ================= */}
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
                i < product.rating ? "text-[#fbbf24]" : "text-gray-300"
              }
            />
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}

          <span className="font-bold text-[#16a34a]">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Add To Cart */}
        <button className="mt-3 border-2 border-[#f43f5e] text-[#f43f5e] py-3 px-5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#f43f5e] hover:text-white transition-all duration-200 text-sm font-semibold">
          <ShoppingCart size={18} strokeWidth={3} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
