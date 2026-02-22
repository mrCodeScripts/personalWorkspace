"use client";
import Image from "next/image";
import LogoNoBG from "../../assets/PubMarket_noBG.png";
import { useActionState, useState } from "react";
import { ArrowRight, Eye, EyeClosed, User } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean | null>(false);
  const [formState, actionForm, isPending] = useActionState<
    { username: string; password: string },
    FormData
  >(
    (prevState, formData) => {
      return prevState;
    },
    { username: "", password: "" },
    "/auth/login",
  );

  return (
    <>
      <div>
        {/* <div>
            <Image src={LogoNoBG} alt="Logo with no BG." />
        </div> */}
        <div className="flex flex-col w-full min-h-screen bg-base-200 justify-center items-center font-custom gap-5">
          <h1 className="text-[24px] text-[#f43f5e] font-semibold">
            Welcome back User!
          </h1>
          <form
            action={actionForm}
            className="flex w-full flex-col px-10 py-5 gap-6"
          >
            <div className="flex flex-col w-full h-full gap-2">
              <div className="input-lg input-primary outline-[#f43f5e] border-2 !border-gray-300 flex flex-row w-full py-3 px-8 rounded-[15px]">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full h-auto outline-none border-none bg-none"
                />
                <div className="w-auto text-[#f43f5e]">
                  <User strokeWidth={2} />
                </div>
              </div>
              <div className="input-lg input-primary outline-[#f43f5e] border-2 !border-gray-300 flex flex-row w-full py-3 px-8 rounded-[15px]">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full h-auto outline-none border-none bg-none"
                  placeholder="Password"
                />
                <div
                  className="w-auto text-[#f43f5e]"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </div>
              </div>
              <Link
                href="/"
                className="hover:text-[#f43f5e] focus:text-[#f43f5e] duration-200 text-sm ml-auto px-2 text-gray-800"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="group relative btn !text-[#f3f4f6] !border-[#f43f5e] border-2 rounded-md p-5 text-lg bg-[#f43f5e] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute left-[50%] group-hover:translate-x-[-80%] group-focus:translate-x-[-80%] translate-x-[-70%] transition-all duration-300">
                Sign In
              </span>
              <div className="absolute right-23 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-focus:opacity-100 group-focus:translate-x-0">
                <ArrowRight />
              </div>
            </button>
            <div className="flex flex-row gap-5 text-[#1f2937] w-full items-center">
              <div className="w-full h-[1px] bg-base-300"></div>
              <p className="text-gray-400">or</p>
              <div className="w-full h-[1px] bg-base-300"></div>
            </div>
          </form>
          <div className="w-full h-fit flex flex-row justify-center gap-3">
            <div className="group text-[40px] text-[#1f2937] border-none border-[#1f2937] rounded-full p-2 bg-[#f3f4f6]">
              <FaFacebook className="group-hover:text-[#f43f5e] duration-200" />
            </div>
            <div className="group text-[40px] text-[#1f2937] border-none border-[#1f2937] rounded-full p-2 bg-[#f3f4f6]">
              <FaGoogle className="group-hover:text-[#f43f5e] duration-200" />
            </div>
          </div>
          <p className="text-sm text-gray-800">
            Don't have an account?
            <Link
              href="/auth/register"
              className="!text-[#f43f5e] duration-200 ml-auto px-2 text-gray-800 font-semibold"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
