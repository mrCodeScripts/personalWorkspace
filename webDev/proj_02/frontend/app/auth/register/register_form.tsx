"use client";
import Image from "next/image";
import LogoNoBG from "../../assets/PubMarket_noBG.png";
import { useActionState, useState } from "react";
import { ArrowRight, Eye, EyeClosed, MailIcon, User } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaGoogle, FaMobile } from "react-icons/fa";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean | null>(false);
  const [showPassword2, setShowPassword2] = useState<boolean | null>(false);
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
            Create Account
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
                  type="text"
                  placeholder="Phone or Email"
                  className="w-full h-auto outline-none border-none bg-none"
                />
                <div className="w-auto text-[#f43f5e]">
                  <MailIcon strokeWidth={2} />
                </div>
              </div>
              <div className="input-lg input-primary outline-[#f43f5e] border-2 !border-gray-300 flex flex-row w-full py-3 px-8 rounded-[15px]">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full h-auto outline-none border-none bg-none"
                  placeholder="Create password"
                />
                <div
                  className="w-auto text-[#f43f5e]"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </div>
              </div>
              <div className="input-lg input-primary outline-[#f43f5e] border-2 !border-gray-300 flex flex-row w-full py-3 px-8 rounded-[15px]">
                <input
                  type={showPassword2 ? "text" : "password"}
                  className="w-full h-auto outline-none border-none bg-none"
                  placeholder="Confirm password"
                />
                <div
                  className="w-auto text-[#f43f5e]"
                  onClick={() => setShowPassword2((prev) => !prev)}
                >
                  {showPassword2 ? <EyeClosed /> : <Eye />}
                </div>
              </div>
            </div>
            <div className="flex flex-row text-sm justify-left align-center text-gray-800 gap-3 px-1">
                <input type="checkbox" name="" id="" className="checkbox checkbox-primary w-6 h-6 border-2 rounded-sm" />
                <p>
                    Remember me
                </p>
            </div>
            <button
              type="submit"
              className="group relative btn !text-[#f3f4f6] !border-[#f43f5e] border-2 rounded-md p-5 text-lg bg-[#f43f5e] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute left-[50%] group-hover:translate-x-[-80%] group-focus:translate-x-[-80%] translate-x-[-70%] transition-all duration-300">
                Sign Up
              </span>
              <div className="absolute right-23 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-focus:opacity-100 group-focus:translate-x-0">
                <ArrowRight />
              </div>
            </button>
            <p className="text-sm text-center text-gray-800">
              Don't have an account?
              <Link
                href="/auth/login"
                className="!text-[#f43f5e] duration-200 ml-auto px-2 text-gray-800 font-semibold"
              >
                Signin
              </Link>
            </p>
            {/* <div className="flex flex-row gap-5 text-[#1f2937] w-full items-center">
              <div className="w-full h-[1px] bg-base-300"></div>
              <p className="text-gray-400">or</p>
              <div className="w-full h-[1px] bg-base-300"></div>
            </div> */}
          </form>
          {/* <div className="w-full h-fit flex flex-row justify-center gap-3">
            <div className="group text-[40px] text-[#1f2937] border-none border-[#1f2937] rounded-full p-2 bg-[#f3f4f6]">
              <FaFacebook className="group-hover:text-[#f43f5e] duration-200" />
            </div>
            <div className="group text-[40px] text-[#1f2937] border-none border-[#1f2937] rounded-full p-2 bg-[#f3f4f6]">
              <FaGoogle className="group-hover:text-[#f43f5e] duration-200" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
