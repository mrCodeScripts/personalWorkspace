"use client";
import { User, Eye, EyeOff, Mail } from "lucide-react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useActionState, useState } from "react";
import OptionalAccounts from "../auth_comp/optional_reg_log";

export default function LoginForm() {
  type UserForm = { username: string; password: string };
  const [showPwd, setShowPwd] = useState<boolean>(false);

  const [formState, formAction, isPending] = useActionState<UserForm, FormData>(
    async (state, formData) => {
      return state;
    },
    { username: "", password: "" },
    "/auth/login",
  );

  return (
    <>
      <div className="w-full max-w-md h-[900px] bg-base-300 rounded-[50px] der-base-200 translate-y-[-30%] py-10 font-custom animate-formBottomToTop flex flex-col gap-6">
        <h1 className="text-lg font-semibold text-gray-700 text-center select-none!">
          Welcome to PubMarket
        </h1>
        <form action={formAction} className="px-10 flex flex-col gap-3">
          <div className="flex items-center gap-2 bg-gray-300 px-5 py-3 rounded-md outline-[2px] outline-gray-400 focus:outline-[2px] focus:outline-gray-400">
            <input
              type="text"
              className="text-[] border-none w-full bg-transparent outline-none"
              placeholder="Username"
            />
            <User className="text-gray-700" strokeWidth={2}></User>
          </div>
          <div className="flex items-center gap-2 bg-gray-300 px-5 py-3 rounded-md outline-[2px] outline-gray-400 focus:outline-[2px] focus:outline-gray-400">
            <input
              type={showPwd ? "text" : "password"}
              className="border-none w-full bg-transparent outline-none"
              placeholder="Password"
            />
            <div onClick={() => setShowPwd((prev) => !prev)}>
              {showPwd ? (
                <EyeOff className="text-gray-700" strokeWidth={2}></EyeOff>
              ) : (
                <Eye className="text-gray-700" strokeWidth={2}></Eye>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gray-300 px-5 py-3 rounded-md outline-[2px] outline-none focus:outline-[2px] focus:outline-gray-400 bg-[#f43f5e]! text-white font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed select-none"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
          <div className="flex items-center px-1 mx-auto w-full">
            <p className="text-center font-custom text-[10px] font-medium text-gray-700 select-none cursor-pointer pr-5 hover:text-[#f43f5e] duration-200">
              Forgot password?
            </p>
            <p className="text-center font-custom text-[10px] font-medium text-gray-700 select-none cursor-pointer ml-auto">
              <span>Don't have an account?</span>
              <span className="hover:text-[#f43f5e] hover:cursor-pointer duration-200 ml-1 font-bold">
                <Link href="/auth/register">Signup</Link>
              </span>
            </p>
          </div>
        </form>
        <OptionalAccounts />
      </div>
    </>
  );
}
