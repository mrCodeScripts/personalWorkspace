"use client";
import Link from "next/link";
import { useActionState, useState } from "react";

export default function OTPForm() {
  const numberOfDigits: number = 6;
  const [sendingOTP, setSendingOTP] = useState<boolean>(false);
  const [OTPItems, setOTPItems] = useState<number[]>([]);
  const [formState, formAction, isPending] = useActionState<
    { otp: string },
    FormData
  >(
    async (prev, formData) => {
      await new Promise((res) => setTimeout(res, 3000));
      return { otp: "" };
    },
    { otp: "" },
    "/pubMarket/auth/forgotPassword/OTP",
  );

  return (
    <>
      <div>
        <form action={formAction} className="flex flex-col w-full gap-5">
          <div className="grid grid-cols-6 gap-2 w-full max-w-75">
            {Array.from({ length: numberOfDigits }).map((_, i) => (
              <input
                key={i}
                type="text"
                disabled={isPending}
                className={` ${isPending ? "bg-[#F3F4F6] border-gray-300 text-[#9CA3AF]" : "bg-gray-200 border-gray-400"} border-2 w-full h-12 text-center bg-gray-200 rounded-md focus:outline-none`}
                maxLength={1}
              />
            ))}
          </div>
          {/* {
            sendingOTP ? (

            ) : ()
          } */}
          <p className="text-center text-sm font-semibold text-gray-700">
            Didn’t receive it? <Link href="/" className="text-[#f43f5e] font-bold">Resend</Link>
          </p>
          <button
            className={`group ${isPending ? "opacity-90" : "opacity-100"} p-3 font-semibold text-md rounded-md bg-[#f43f5e] border-none text-[#f3f4f6]`}
          >
            {isPending ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </>
  );
}
