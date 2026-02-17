import RegisterForm from "./register_comp/register_form";
import Image from "next/image";
import NoBgLogo from "../../assets/PubMarket_noBG.png";

export default function RegisterPage() {
  return (
    <>
      <div className="register-page-wrapper"  style={{color: "#1f2937"}}>
        <div className="register-page-logo">
          <Image src={NoBgLogo} alt="Logo" width={100} height={100} style={{border: "1px solid red"}} />
        </div>
        <div className="form-wrapper">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
