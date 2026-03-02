"use client";

import { PlayIcon, Star } from "lucide-react";
import Image from "next/image";

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

export default function ProductCardV3({ product }: { product: Product }) {
  return (
    <>
      <div className="group hover:bg-gray-200 duration-200 flex flex-col gap-2 border-2 border-gray-300">
        {/* PRODUCT DISPLAY */}
        <div className="w-full relative w-inherit h-60">
          <div className="absolute w-10 h-10 text-red-300">
            <PlayIcon size={13} />
          </div>
          <Image
            src={"/assets/sampleProducts/product_1.png"}
            className="object-cover"
            alt="Product number1"
            fill
          />
        </div>

        {/* PRODUCT INFORMATIONS */}
        <div className="flex flex-col p-2 gap-1">
          <h3 className="text-sm font-semibold text-gray-600 line-clamp-2">
            {product.name} sample product ljsdfljsdf
          </h3>
          <div className="flex flex-row gap-2 items-center">
            <span className="text-md text-[#1f2937] font-semibold">
              ${product.price}
            </span>
            {/* <span>|</span> */}
            <span className="text-sm text-gray-400 line-through">
              ${product.discount}
            </span>
            <span className="text-md ml-auto text-[#3b82f6]">
              -30% 
            </span>
          </div>
          <div className="flex flex-row">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < product.rating
                      ? "text-[#fbbf24] fill-[#fbbf24]"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm ml-auto text-gray-500">
              300+ sold
            </span>
          </div>
          <div className="flex flex-row">
            <span className="line-clamp-1 text-[10px] text-gray-600">
              Somewhere in earth slkfd
            </span>
            <span className="bg-[#16a34a] text-[#f3f4f6] font-semibold text-xs ml-auto px-2 rounded">
              COD
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
