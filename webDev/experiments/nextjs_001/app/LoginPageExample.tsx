"use client";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import React, { useActionState, useEffect } from "react";

export default function LoginPageExample({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
        console.log("Logged in");
        router.push("/examplePages/dashboard");
    }
  }, [status, router]);

  const [formState, actionForm, isPending] = useActionState<
    { username: string; password: string },
    FormData
  >(
    async (prev, formData) => {
      // SIMULATE LOADING
      await new Promise((res) => setTimeout(res, 3000));

      console.log("logged in!");
      router.push("/examplePages/dashboard");

      return prev;
    },
    { username: "", password: "" },
    "/someForm",
  );

  return (
    <>
      <div className="w-full h-[300px] border-2 flex flex-col items-center justify-center">
        <form action={actionForm} className="flex flex-col gap-2">
          <input
            type="text"
            className="p-3 bg-gray-200 text-gray-700 rounded-md"
          />
          <input
            type="text"
            className="p-3 bg  -gray-200 text-gray-700 rounded-md"
          />
          <button
            type="submit"
            className="p-3 bg-green-500 text-white rounded-md"
          >
            Login
          </button>
        </form>
        <button type="button" className="p-3 bg-blue-500 text-white rounded-md" onClick={() => signIn("google")}>Login with Google</button>
      </div>
      {children}
    </>
  );
}
