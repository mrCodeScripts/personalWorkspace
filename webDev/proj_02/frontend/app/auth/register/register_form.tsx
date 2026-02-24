"use client";
import Image from "next/image";
import axios from 'axios';
import LogoNoBG from "../../assets/PubMarket_noBG.png";
import { useActionState, useState } from "react";
import { ArrowRight, Eye, EyeClosed, MailIcon, User } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaGoogle, FaMobile } from "react-icons/fa";
import {
  FormValidationResult,
  validateEmailOrPhone,
  validateFormFields,
  validateUsername,
} from "../auth_comp/filter_components";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean | null>(false);
  const [showPassword2, setShowPassword2] = useState<boolean | null>(false);
  const [formErrorsFirstLayer, setFormErrorsFirstLayer] = useState<FormValidationResult | null>(null);


  const [formState, actionForm, isPending] = useActionState<
    { username: string; emailOrPhone: string; createPassword: string; confirmPassword: string },
    FormData
  >(
    async (prevState, formData) => {
      const username: string = String(formData.get("username"));
      const emailOrPhone: string = String(formData.get("phone-email"));
      const createPassword: string = String(formData.get("created-password"));
      const confirmPassword: string = String(formData.get("confirm-password"));

      const formValidation: FormValidationResult = validateFormFields({username, emailOrPhone, createPassword, confirmPassword});

      if (formValidation.hasError) setFormErrorsFirstLayer(formValidation);

      if (!formValidation.hasError) return {username, emailOrPhone, createPassword, confirmPassword};

      axios.post("/pubMarket/auth/register", {
        username: username,
        emailOrPhone: emailOrPhone,
        createPassword: createPassword,
        confirmPassword: confirmPassword
      }).then(res => {
        // TODO -> manage responses on register 
      }).catch(err => {
        // TODO -> manage responses on error register
      });
      


      /**
       * USERNAME ERROR MESSAGES
       *
       * 1. Required
       *    - "Username is required."
       *    - "Please enter a username."
       * 2. Length
       *    - "Username must be at least 3 characters long."
       *    - "Username must not exceed 20 characters long."
       * 3. Characters
       *    - "Username can only contain letters, numbers, underscores, and dots."
       *    - "Special characters are not allowed in username."
       *    - "Spaces are not allowed in username."
       * 4. Format
       *    - "Username cannot start or end with a special character."
       *    - "Username cannot contain consecutive dots."
       * 5. Availability
       *    - "Username is already taken."
       *    - "This username is not available."
       *    - "Username is reserved."
       * 6. Security
       *    - "Username contains restricted words."
       *    - "Username violates community guidelines."
       */

      /**
       * ✅ 2. Email / Phone Number — Error Messages
       *
       * 📧 Email
       *
       * 📌 Required
       * Email address is required.
       * Please enter your email.
       *
       * 📌 Format
       * Invalid email address.
       * Please enter a valid email format (example@domain.com).
       * Email must contain @ and domain.
       *
       * 📌 Domain
       * Email domain is not supported.
       * Disposable email addresses are not allowed.
       *
       * 📌 Length
       * Email address is too long.
       * Email address is too short.
       *
       * 📌 Availability
       * Email is already registered.
       * This email is in use.
       *
       * 📌 Verification
       * Email not verified.
       * Please verify your email first.
       *
       * 📱 Phone Number
       *
       * 📌 Required
       * Phone number is required.
       * Please enter your mobile number.
       *
       * 📌 Format
       * Invalid phone number format.
       * Please enter a valid mobile number.
       * Country code is missing.
       *
       * 📌 Length
       * Phone number must be 10–15 digits.
       * Phone number is too short.
       * Phone number is too long.
       *
       * 📌 Characters
       * Phone number must contain only digits.
       * Special characters are not allowed.
       *
       * 📌 Availability
       * Phone number already exists.
       * This number is already linked to another account.
       *
       * 📌 Verification
       * Phone number not verified.
       * OTP verification failed.
       * Invalid verification code.
       */

      /**
       * ✅ 3. Create Password — Error Messages
       *
       * 📌 Required
       * Password is required.
       * Please create a password.
       *
       * 📌 Length
       * Password must be at least 8 characters.
       * Password must not exceed 64 characters.
       *
       * 📌 Strength
       * Password must contain at least one uppercase letter.
       * Password must contain at least one lowercase letter.
       * Password must contain at least one number.
       * Password must contain at least one special character.
       *
       * 📌 Common / Weak
       * Password is too weak.
       * Password is commonly used.
       * Password is easily guessable.
       *
       * 📌 Security
       * Password cannot contain your username.
       * Password cannot contain personal information.
       * Password has been compromised in a data breach.
       *
       * 📌 Format
       * Spaces are not allowed in password.
       * Password contains invalid characters.
       *
       * ✅ 4. Confirm Password — Error Messages
       *
       * 📌 Required
       * Please confirm your password.
       * Confirm password is required.
       *
       * 📌 Matching
       * Passwords do not match.
       * Password confirmation does not match.
       * Passwords must be identical.
       *
       * 📌 Validation
       * Please re-enter your password correctly.
       * Confirmation password is invalid.
       */

      await new Promise((res) => setTimeout(res, 3000));

      return prevState;
    },
    { username: "", emailOrPhone: "", createPassword: "", confirmPassword: ""},
    "/auth/login",
  );

  return (
    <>
      <div>
        {/* <div>
            <Image src={LogoNoBG} alt="Logo with no BG." />
        </div> */}
        <div className="flex flex-col w-full min-h-screen bg-base-200 justify-center items-center font-custom gap-5">
          <h1 className="text-[24px] text-[#f43f5e] font-semibold">
            Create Account
          </h1>
          <form
            action={actionForm}
            className="flex w-full flex-col px-10 gap-9"
          >
            <div className="flex flex-col w-full h-full gap-4">
              <div
                className={`${isPending ? "bg-base-300" : "bg-base-200"} input-lg input-primary outline-[#f43f5e] border-2 border-gray-300! flex flex-row w-full py-3 px-8 rounded-[15px]`}
              >
                <input
                  type="text"
                  disabled={isPending}
                  placeholder="Username"
                  className={`w-full h-auto outline-none border-none bg-none text-sm font-semibold ${isPending ? "text-gray-400" : "text-gray-700"}`}
                />
                <div className="w-auto text-[#f43f5e]">
                  <User strokeWidth={2} />
                </div>
              </div>
              <div
                className={`${isPending ? "bg-base-300" : "bg-base-200"} input-lg input-primary outline-[#f43f5e] border-2 border-gray-300! flex flex-row w-full py-3 px-8 rounded-[15px]`}
              >
                <input
                  type="text"
                  placeholder="Phone or Email"
                  disabled={isPending}
                  className={`w-full h-auto outline-none border-none bg-none text-sm font-semibold ${isPending ? "text-gray-400" : "text-gray-700"}`}
                />
                <div className="w-auto text-[#f43f5e]">
                  <MailIcon strokeWidth={2} />
                </div>
              </div>
              <div
                className={`${isPending ? "bg-base-300" : "bg-base-200"} input-lg input-primary outline-[#f43f5e] border-2 border-gray-300! flex flex-row w-full py-3 px-8 rounded-[15px]`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full h-auto outline-none border-none bg-none text-sm font-semibold ${isPending ? "text-gray-400" : "text-gray-700"}`}
                  disabled={isPending}
                  placeholder="Create password"
                />
                <div
                  className="w-auto text-[#f43f5e]"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </div>
              </div>
              <div
                className={`${isPending ? "bg-base-300" : "bg-base-200"} input-lg input-primary outline-[#f43f5e] border-2 border-gray-300! flex flex-row w-full py-3 px-8 rounded-[15px]`}
              >
                <input
                  type={showPassword2 ? "text" : "password"}
                  className={`w-full h-auto outline-none border-none bg-none text-sm font-semibold ${isPending ? "text-gray-400" : "text-gray-700"}`}
                  disabled={isPending}
                  placeholder="Confirm password"
                />
                <div
                  className="w-auto text-[#f43f5e]"
                  onClick={() => setShowPassword2((prev) => !prev)}
                >
                  {showPassword2 ? <EyeClosed /> : <Eye />}
                </div>
              </div>
            </div>
            <div
              className={`flex flex-row text-sm justify-left align-center gap-3 px-1 ${isPending ? "text-gray-400" : "text-gray-600!"} font-semibold`}
            >
              <input
                disabled={isPending}
                type="checkbox"
                name=""
                id=""
                className="checkbox checkbox-primary w-6 h-6 border-2 rounded-sm text-gray-500!"
              />
              <p>Remember me</p>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className={`group ${isPending ? "opacity-80" : "opacity-100"} relative btn text-[#f3f4f6]! border-[#f43f5e]! border-2 rounded-md p-5 text-lg bg-[#f43f5e] flex items-center justify-center overflow-hidden`}
            >
              <span className="absolute left-[50%] group-hover:translate-x-[-90%] group-focus:translate-x-[-90%] translate-x-[-50%] transition-all duration-300 text-[#ffffff]">
                {isPending ? "Signin Up..." : "Sign Up"}
              </span>
              <div className="absolute right-23 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-focus:opacity-100 group-focus:translate-x-0">
                <ArrowRight />
              </div>
            </button>
            <p className="text-sm text-center text-gray-800">
              Don't have an account?
              <Link
                href="/auth/login"
                className="!text-[#f43f5e] duration-200 ml-auto px-2 text-gray-800 font-semibold"
              >
                Sign in
              </Link>
            </p>
            {/* <div className="flex flex-row gap-5 text-[#1f2937] w-full items-center">
              <div className="w-full h-[1px] bg-base-300"></div>
              <p className="text-gray-400">or</p>
              <div className="w-full h-[1px] bg-base-300"></div>
            </div> */}
          </form>
          {/* <div className="w-full h-fit flex flex-row justify-center gap-3">
            <div className="group text-[40px] text-[#1f2937] border-none border-[#1f2937] rounded-full p-2 bg-[#f3f4f6]">
              <FaFacebook className="group-hover:text-[#f43f5e] duration-200" />
            </div>
            <div className="group text-[40px] text-[#1f2937] border-none border-[#1f2937] rounded-full p-2 bg-[#f3f4f6]">
              <FaGoogle className="group-hover:text-[#f43f5e] duration-200" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
