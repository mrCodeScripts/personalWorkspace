"use client";

import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/projectExamples/publicMarket/products/${product.id}`}
      className="card bg-base-100 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
      aria-label={`Open ${product.name}`}
    >
      {/* Image */}
      <figure className="bg-base-200">
        <img
          src={product.image ?? '/default-product.svg'}
          alt={product.name}
          className="h-40 sm:h-36 md:h-40 w-full object-cover"
          loading="lazy"
          onError={(e) => {
            // graceful fallback if image fails to load
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            e.currentTarget.src = '/default-product.svg';
          }}
        />
      </figure>

      {/* Info */}
      <div className="card-body p-3">
        <h3 className="text-sm font-medium line-clamp-2">
          {product.name}
        </h3>

        <p className="text-primary font-bold text-sm mt-1">
          ₱{product.price}
        </p>

        <div className="text-xs text-gray-400 mt-1">
          In stock
        </div>
      </div>
    </Link>
  );
}
