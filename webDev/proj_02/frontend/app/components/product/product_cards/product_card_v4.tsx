"use client";

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
      <div className="flex flex-col gap-2 border-2 border-gray-300">
        {/* PRODUCT DISPLAY */}
        <div className="w-full relative w-inherit h-50">
          <Image src={'/assets/sampleProducts/product_1.png'} className="object-cover" alt="Product number1" fill />
        </div>

        {/* PRODUCT INFORMATIONS */}
        <div>
          <div>

          </div>
          <div>

          </div>
        </div>
      </div>
    </>
  );
}
