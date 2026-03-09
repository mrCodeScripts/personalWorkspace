import ProductCardV4 from "../product_cards/product_card_v4";

type Product = {
  id: number;
  name: string;
  rating: number;
  price: number;
  originalPrice: number;
  flashSale: boolean;
  deal: boolean;
  discount: number;
  images: string[];
};

export default function ProductPageV2({
  products,
  pageTitle,
}: {
  products: Product[];
  pageTitle?: string;
}) {
  return (
    <>
      <section className="w-full bg-none">
        <div className="max-w-310 mx-auto">
          <h2 className="text-xl font-semibold mb-5 text-gray-700">
            {pageTitle}
          </h2>

          <div className="grid gap-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map((product) => (
              <ProductCardV4 key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
