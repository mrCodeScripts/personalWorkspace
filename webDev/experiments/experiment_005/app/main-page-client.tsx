'use client';

import { useRouter } from "next/navigation";

export default function MainPageClient () {
  const router = useRouter();

  return (
    <>
      <p className="text-md text-white underline hover:text-blue-300" onClick={() => router.push("/samples/slugs/'this is a data'")}>This will navigate you to</p>
    </>
  );
}