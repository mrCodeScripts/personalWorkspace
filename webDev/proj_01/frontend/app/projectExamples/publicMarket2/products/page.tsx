"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function ProductsPage() {
  const products = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: (i + 1) * 150,
    image: `/default-product.svg`,
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">All Products</h1>

      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/projectExamples/publicMarket2/products/${product.id}`}
            className="card bg-base-100 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <figure className="bg-base-200">
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover"
                loading="lazy"
              />
            </figure>
            <div className="card-body p-3">
              <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
              <p className="text-primary font-bold text-sm">₱{product.price}</p>
              <div className="flex gap-2 mt-2">
                <button className="btn btn-primary btn-xs flex-1">
                  <ShoppingCart size={14} /> Add
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
