import Image from "next/image";
import MainPageClient from "./main-page-client";

export default function Home() {
  return (
    <>
      <p className="text-lg font-bold text-gray-800 p-3">This is the homepage.</p>
      <MainPageClient />
    </>
  );
}
