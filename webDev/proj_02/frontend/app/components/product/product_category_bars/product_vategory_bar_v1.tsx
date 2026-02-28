"use client";

import Image from "next/image";

type ProductCategory = {
  name: string;
  logo: string;
};

export default function ProductCategoryBarV1({
  productCategories,
  sectionTitle,
}: {
  productCategories: ProductCategory[];
  sectionTitle?: string;
}) {
  return (
    <>
      <section className="flex flex-col gap-5 w-full">
        <p className="text-lg text-gray-700 font-semibold">{sectionTitle}</p>
        <ul className="flex flex-row gap-5 overflow-x-auto scroll-smooth scrollbar-transparent">
          {productCategories.map((e, i) => (
            <li key={i} className="flex flex-col items-center min-w-[80px]">
              <div className="relative w-13 h-13 aspect-square">
                <Image
                  src={`/assets/icons/${e.logo}`}
                  alt={`category-${i}`}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center mt-1 text-xs text-gray-500 font-semibold">{e.name}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
