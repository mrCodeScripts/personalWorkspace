import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen justify-center items-center bg-base-200 p-10 gap-7">
        <h1 className="text-2xl">Forgot Password?</h1>
        <p className="text-sm">Choose email or phone number verification.</p>
        <div className="flex flex-col gap-3 w-full">
          <Link
            href="/auth/forgotPassword/verify/email"
            className={`group text-sm relative btn text-[#f3f4f6]! border-[#f43f5e]! border-2 rounded-md p-5 bg-[#f43f5e] flex items-center justify-center overflow-hidden w-full`}
          >
            <span className="absolute left-[50%] group-hover:translate-x-[-90%] group-focus:translate-x-[-90%] translate-x-[-50%] transition-all duration-300 text-[#ffffff]">
              Email Address
            </span>
            <div className="absolute right-23 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-focus:opacity-100 group-focus:translate-x-0">
              <ArrowRight />
            </div>
          </Link>
          <Link
            href="/auth/forgotPassword/verify/phoneNumber"
            className={`group text-sm relative btn text-[#f3f4f6]! border-[#f43f5e]! border-2 rounded-md p-5 bg-[#f43f5e] flex items-center justify-center overflow-hidden w-full`}
          >
            <span className="absolute left-[50%] group-hover:translate-x-[-90%] group-focus:translate-x-[-90%] translate-x-[-50%] transition-all duration-300 text-[#ffffff]">
              Phone Number
            </span>
            <div className="absolute text-sm right-23 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-focus:opacity-100 group-focus:translate-x-0">
              <ArrowRight />
            </div>
          </Link>
          <p className="text-xs text-gray-600 text-left">
            <span className="font-semibold">Reminder: </span>
            Make sure you have access to the email or phone number associated
            with your account.
          </p>
        </div>
        <p className="text-gray-600 text-sm">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-[#f43f5e] font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </>
  );
}
