import { LoginForm } from "@/components/login-form";

export default function LoginClientV1() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen gap-10">
        <LoginForm className="w-[600px]" />
      </div>
    </>
  );
}
