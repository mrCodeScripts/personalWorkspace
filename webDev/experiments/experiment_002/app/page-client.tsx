'use client';
import { useRouter } from "next/navigation";

export default function HomePageClient() {
  const router = useRouter();

  return (
    <>
      <h1>This is the main page</h1>
      <button className="bg-blue-300 p-3 rounded-md font-semibold text-md" onClick={() => router.push("/authentication-page/login")}> Login </button>
      <button className="bg-blue-300 p-3 rounded-md font-semibold text-md" onClick={() => router.push("/authentication-page/signup")}> Signup </button>
    </>
  );
}