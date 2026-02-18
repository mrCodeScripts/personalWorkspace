import LoginForm from "./loginForm";
import Image from "next/image";
import LogoNoBG from "../../assets/PubMarket_noBG.png";

export default function LoginPage() {
  return (
    <>
      <div className="fixed login-page-wrapper w-full min-h-screen bg-base-200 text-base-content flex flex-col items-center justify-center gap-10">
        <div className="w-[350px] h-[350px] relative animate-hideShow user-select-none user-drag-none">
          <Image
            draggable={false}
            src={LogoNoBG}
            alt="PubMarket Logo"
            className="w-full h-full"
          />
        </div>
        <LoginForm />
      </div>
    </>
  );
}
