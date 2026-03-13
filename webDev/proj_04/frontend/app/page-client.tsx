'use client';
import Image from "next/image";
import LoginPage from "./login.page";
import { useRouter } from "next/navigation";

export default function HomePageClient() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>
        Shit
      </h1>
      <button onClick={() => router.push("/email-password")} className="btn bg-red-300">Login Page</button>
      {/* <LoginPage /> */}
    </div>
  );
}

