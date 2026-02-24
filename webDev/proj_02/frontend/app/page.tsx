import Image from "next/image";
import LogoWithNoBG from "./assets/PubMarket_noBG.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen bg-base-200 flex flex-col items-center pt-10">
        {/* Logo */}
        <div className="flex w-75 h-75 mb-8">
          <Image
            src={LogoWithNoBG}
            alt="Logo with no BG"
            className="object-contain"
            priority
          />
        </div>

        {/* Buttons */}
        <div className="w-full max-w-md flex flex-col px-10 gap-6">
          {/* Sign In */}
          <Link
            href="/auth/login"
            className="group relative btn text-[#f43f5e]! border-[#f43f5e]! border-2 rounded-md p-5 text-lg flex items-center justify-center overflow-hidden outline-none"
          >
            <span className="absolute left-[50%] group-hover:translate-x-[-90%] group-focus:translate-x-[-90%] translate-x-[-50%] transition-all duration-300">
              Sign In
            </span>
            <div className="absolute right-23 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-focus:opacity-100 group-focus:translate-x-0">
              <ArrowRight />
            </div>
          </Link>

          {/* Sign Up */}
          <Link
            href="/auth/register"
            className="group relative btn text-[#f3f4f6]! border-[#f43f5e]! border-2 rounded-md p-5 text-lg bg-[#f43f5e] flex items-center justify-center overflow-hidden"
          >
            <span className="absolute left-[50%] group-hover:translate-x-[-90%] group-focus:translate-x-[-90%] translate-x-[-50%] transition-all duration-300">
              Sign Up
            </span>
            <div className="absolute right-23 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-focus:opacity-100 group-focus:translate-x-0">
              <ArrowRight />
            </div>
          </Link>
          <div className="flex flex-row gap-5 text-[#1f2937] w-full items-center justify-center">
            <span className="w-auto h-[1px] bg-base-300"></span>
            <p>or Signup with</p>
            <span className="w-auto h-[1px] bg-base-300"></span>
          </div>
          <div className="w-full h-fit flex flex-row justify-center gap-3">
            <div className="group text-[40px] text-[#1f2937] border-none border-[#1f2937] rounded-full p-2 bg-[#f3f4f6]">
              <FaFacebook className="group-hover:text-[#f43f5e] duration-200" />
            </div>
            <div className="group text-[40px] text-[#1f2937] border-none border-[#1f2937] rounded-full p-2 bg-[#f3f4f6]">
              <FaGoogle className="group-hover:text-[#f43f5e] duration-200" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
