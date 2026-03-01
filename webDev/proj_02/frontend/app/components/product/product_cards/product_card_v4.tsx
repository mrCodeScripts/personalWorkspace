"use client";

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
      <div>

      </div>
    </>
  );
}
