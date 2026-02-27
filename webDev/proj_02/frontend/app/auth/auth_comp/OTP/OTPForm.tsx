"use client";
import Link from "next/link";
import { ReactNode, useActionState, useEffect, useRef, useState } from "react";

export default function OTPForm({ children }: { children?: ReactNode }) {
  const numberOfDigits: number = 6;
  const OTP_COUNTDOWN: number = 10;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [OTPValues, setOTPValues] = useState<string[]>(
    Array(numberOfDigits).fill(""),
  );
  const [resendOTP, setResendOTP] = useState<boolean>(false);
  const [resendOTPCountdown, setResendOTPCountdown] = useState<number>(10);
  const [OTPItems, setOTPItems] = useState<number[]>([]);
  const [formState, formAction, isPending] = useActionState<
    { otp: string },
    FormData
  >(
    async (prev, formData) => {
      await new Promise((res) => setTimeout(res, 3000));

      // ADD SOME ERROR AND SHIT

      return { otp: "" };
    },
    { otp: "" },
    "/pubMarket/auth/forgotPassword/OTP",
  );

  useEffect(() => {
    if (resendOTPCountdown === 0) {
      setResendOTP(true);
      return;
    }

    const timer = setInterval(() => {
      setResendOTPCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendOTPCountdown, resendOTP]);

  const resendOTPAction: () => void = () => {
    setResendOTPCountdown(OTP_COUNTDOWN);
    setResendOTP(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const val = e.target.value;

    // Only allow digits
    if (!/^\d*$/.test(val)) return;

    setOTPValues((prev) => {
      const copy = [...prev];
      copy[i] = val;
      return copy;
    });

    if (val && i < numberOfDigits - 1) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number,
  ) => {
    const key = e.key;

    if (key === "Backspace") {
      e.preventDefault(); // optional, prevents default cursor jump

      setOTPValues((prev) => {
        const copy = [...prev];
        if (copy[i] !== "") {
          // Case 2: input has a value → clear it
          copy[i] = "";
        } else if (i > 0) {
          // Case 1: input is empty → focus previous
          inputRefs.current[i - 1]?.focus();
        }
        return copy;
      });

      // Optional: move focus if current is empty
      if (OTPValues[i] === "" && i > 0) {
        inputRefs.current[i - 1]?.focus();
      }
    }

    if (key === "Delete") {
      setOTPValues((prev) => {
        const copy = [...prev];
        copy[i] = ""; // clear current input
        return copy;
      });
    }
  };

  // useEffect(() => {
  //   return () => {}
  // }, [OTPValues]);

  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <form action={formAction} className="flex flex-col w-full gap-5">
          <div className="w-full flex flex-col gap-2">
            <div className="grid grid-cols-6 gap-2 w-full max-w-95">
              {Array.from({ length: numberOfDigits }).map((_, i) => {
                return (
                  <div className="w-full" key={i}>
                    <input
                      ref={(el) => {
                        inputRefs.current[i] = el;
                      }}
                      type="password"
                      disabled={isPending}
                      value={OTPValues[i]}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                        handleKeyDown(e, i)
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, i)
                      }
                      className={` ${isPending ? "bg-[#F3F4F6] border-gray-300 text-[#9CA3AF]" : "bg-gray-200 border-gray-300 text-gray-600"} focus:border-[#f43f5e] border-2 w-full h-12 text-center bg-gray-200 rounded-md focus:outline-none text-sm font-semibold`}
                      maxLength={1}
                    />
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-error font-semibold">
              Incorrect OTP. Please try again!
            </p>
          </div>
          {resendOTP ? (
            <p className="text-center text-sm text-gray-600">
              Didn’t receive it?{" "}
              <span
                onClick={() => {
                  setResendOTP((prev) => !prev);
                  setResendOTPCountdown(OTP_COUNTDOWN);
                }}
                className="text-[#f43f5e] font-bold hover:cursor-pointer"
              >
                {" "}
                Resend
              </span>
            </p>
          ) : (
            <p className="text-center text-sm font-semibold text-gray-700">
              Resend code in{" "}
              <span className="font-bold text-gray-800">
                {resendOTPCountdown} seconds
              </span>
            </p>
          )}

          <button
            className={`group ${isPending ? "opacity-90" : "opacity-100"} hover:cursor-pointer p-3 font-semibold text-md rounded-md bg-[#f43f5e] border-none text-[#f3f4f6]`}
          >
            {isPending ? "Verifying..." : "Verify"}
          </button>
        </form>
        {children}
      </div>
    </>
  );
}
