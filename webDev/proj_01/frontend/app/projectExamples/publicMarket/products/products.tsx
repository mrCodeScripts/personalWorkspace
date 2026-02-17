"use client";

import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function ProductsPage() {
  return (
    <div className="space-y-4 p-3 max-w-screen-sm mx-auto w-full">

      <h1 className="text-lg font-bold px-1">All Products</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}
