import ProductCardV3 from "../product_cards/product_card_v3";

type Product = {
    id: number;
    name: string;
    rating: number;
    price: number;
    originalPrice: number;
    discount: number;
    images: string[];
};

export default function ProductPageV1({products, pageTitle}: {products: Product[], pageTitle?: string}) {
  return (
    <>
      <section className="w-full bg-none">
        <div className="max-w-310 mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8 text-gray-700">
            {pageTitle}
          </h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCardV3 key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
