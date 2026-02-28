import Link from "next/link";
import OTPForm from "../OTP/OTPForm";

export default function PhoneVerificationV1() {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen justify-center items-center gap-10 p-10">
        <div className="flex flex-col w-full text-center gap-3 text-gray-700">
          <h1 className="text-2xl text-gray-700 font-semibold">Verify Email</h1>
          <p>
            We’ve sent a 6-digit verification code to your phone number:
            <span className="font-semibold"> +63********01</span>
          </p>
        </div>
        <OTPForm>
          <Link
            href="/auth/forgotPassword/"
            className={`w-full group hover:cursor-pointer p-3 font-semibold text-md rounded-md border-2 border-[#f43f5e] text-[#f43f5e] text-center`}
          >
            Try another method
          </Link>
        </OTPForm>
      </div>
    </>
  );
}
