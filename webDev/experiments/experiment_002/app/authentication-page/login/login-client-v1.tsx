"use client";

import { signIn } from "@/server/user";
import { useActionState, useState } from "react";

export default function LoginPageClientV1() {
  const [loginWithGoogle, setLoginWithGoogle] = useState<boolean>(false);
  const [formState, formAction, isPending] = useActionState<
    { username: string; password: string },
    FormData
  >(
    async (prevState, formData) => {
      // Simulate loading
      await new Promise((res) => setTimeout(res, 3000));

      return prevState;
    },
    { username: "", password: "" },
    "/login-page-client-form",
  );

  return (
    <>
      <form action={formAction} className="flex flex-col gap-2 max-w-80 m-3">
        <input
          type="text"
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-70"
          name="username"
          placeholder="Enter username..."
          disabled={isPending || loginWithGoogle}
        />
        <input
          type="text"
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-70"
          name="password"
          placeholder="Enter password..."
          disabled={isPending || loginWithGoogle}
        />
        <button
          type="submit"
          className="p-3 font-semibold text-md bg-blue-600 text-white rounded-md disabled:opacity-70"
          disabled={isPending || loginWithGoogle}
        >
          Login
        </button>
        <button
          type="button"
          className="text-sm underline p-2 hover:text-blue-300 duration-300 disabled:opacity-70 select-none"
          disabled={isPending || loginWithGoogle}
          onClick={() => {
            signIn();
          }}
        >
          Login with Google
        </button>
      </form>
    </>
  );
}
