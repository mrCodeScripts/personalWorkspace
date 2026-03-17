import { SignupForm } from "@/components/signup-form";

export default function SignupClientV1() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen gap-10">
        <SignupForm className="w-[600px]" />
      </div>
    </>
  );
}
