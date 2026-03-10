"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function MainHomePage({ children, }: { children: React.ReactNode}) {
  const router = useRouter();

  const goHomepage: () => void = () => {
    router.push("/examplePages/home");
  };

  const goDashboard: () => void = () => {
    router.replace("/examplePages/dashboard");
  };

  const goBack: () => void = () => {
    router.back();
  };

  return (
    <>
      <button type="button" className="btn btn-neutral" onClick={goHomepage}>
        Go to homepage
      </button>
      <button type="button" className="btn btn-neutral" onClick={goDashboard}>
        Go to dashboard
      </button>
      <button type="button" className="btn btn-neutral" onClick={goBack}>
        Go back 
      </button>
      <div>{children}</div>
    </>
  );
}
