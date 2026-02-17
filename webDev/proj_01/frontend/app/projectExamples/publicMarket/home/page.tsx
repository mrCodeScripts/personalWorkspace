import CategorySlider from "../components/CategorySlider";
import ProductCard from "../components/ProductCard";

import { products } from "../data/products";

export default function HomePage() {
  return (
    <div className="space-y-4">

      {/* Categories */}
      <CategorySlider />

      {/* Section Title */}
      <h2 className="text-sm font-bold">
        Popular Products
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}
