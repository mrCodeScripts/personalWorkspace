'use client';

import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();

  return (
    <>
      <h1>Welcome to the homepage</h1>
      <p className="text-underline text-blue-400 p-3" onClick={() => router.push("/authentication-page/login")}>Login</p>
      <p className="text-underline text-blue-400 p-3" onClick={() => router.push("/authentication-page/signup")}>Signup</p>
    </>
  );
}