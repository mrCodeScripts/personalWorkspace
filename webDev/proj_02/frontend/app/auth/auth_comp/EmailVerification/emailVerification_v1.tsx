import OTPForm from "../OTP/OTPForm";

export default function EmailVerificationV1() {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen justify-center items-center gap-10 p-10">
        <div className="flex flex-col w-full text-center gap-3 text-gray-700">
          <h1 className="text-2xl text-gray-700 font-semibold">Verify Email</h1>
          <p>
            We’ve sent a 6-digit verification code to your email:
            <span className="font-semibold"> jo*@gmail.com</span>
          </p>
        </div>
        <OTPForm />
      </div>
    </>
  );
}
