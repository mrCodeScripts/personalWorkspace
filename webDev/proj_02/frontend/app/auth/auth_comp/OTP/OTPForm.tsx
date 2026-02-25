import Link from "next/link";
import { useActionState } from "react";

export default function OTPForm() {
  const [formState, formAction, isPending] = useActionState<
    { otp: string },
    FormData
  >(
    (prev, formData) => {
      return { otp: "" };
    },
    { otp: "" },
    "/pubMarket/auth/forgotPassword/OTP",
  );

  return (
    <>
      <div>
        <form action={formAction}>
          <div>
            <div>
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </div>
            <p>
              Didn't get the code? <Link href="/resendCode">Resend it</Link>
            </p>
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
}
