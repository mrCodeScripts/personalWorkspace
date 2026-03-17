"use client";

import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";
import { BugReportForm } from "./samples/sample-ui-1";

export default function MainPageClient() {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen gap-10">
        <BugReportForm />
        <button className="btn btn-neutral" onClick={() => router.push("/authentication/login")}>Login</button>
        <button className="btn btn-neutral" onClick={() => router.push("/authentication/signup")}>Signup</button>
      </div>
    </>
  );
}
