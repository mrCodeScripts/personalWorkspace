import SlugPageClient from "./slug-page-client";

export default function SlugPage ({ slug }: Readonly<{ slug: string }>) {
  return (
    <>
      <p className="text-lg text-white-100 p-3 border-2 border-gray-100">Slug Sample</p>
      <SlugPageClient slugParam={slug} />
    </>
  );
}