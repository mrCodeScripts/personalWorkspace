import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/pubMarketComp/products/${product.id}`}
      className="card bg-base-100 shadow-sm rounded-lg overflow-hidden"
    >
      {/* Image */}
      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="h-32 w-full object-cover"
        />
      </figure>

      {/* Info */}
      <div className="card-body p-2">
        <h3 className="text-sm font-medium line-clamp-2">
          {product.name}
        </h3>

        <p className="text-primary font-bold text-sm mt-1">
          ₱{product.price}
        </p>

        <div className="text-xs text-gray-400">
          In stock
        </div>
      </div>
    </Link>
  );
}
