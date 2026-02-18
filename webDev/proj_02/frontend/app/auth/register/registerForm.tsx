"use client";
import { User, Eye, EyeOff, Mail, X, ArrowUp } from "lucide-react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { useActionState, useState } from "react";
import Link from "next/link";
import OptionalAccounts from "../auth_comp/optional_reg_log";
import { Checkbox } from "@radix-ui/react-checkbox";
export default function RegisterForm() {
  type UserForm = { username: string; password: string };
  const [showCreatePwd, setShowCreatePwd] = useState<boolean>(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);

  const [formState, formAction, isPending] = useActionState<UserForm, FormData>(
    async (state, formData) => {
      return state;
    },
    { username: "", password: "" },
    "/auth/login",
  );

  return (
    <>
      <div
        className={`w-full max-w-md h-[900px] bg-base-300 rounded-[50px] der-base-200 translate-y-[-30%] py-10 font-custom ${showForm ? "animate-formBottomToTop" : "animate-formTopToBottom"} flex flex-col gap-6`}
      >
        <div
          className="absolute top-5 right-5 hover:cursor-pointer hover:text-[#f43f5e] duration-200 p-2 mr-1"
          onClick={() => {
            setShowForm((prev) => !prev);
            console.log("clicked");
          }}
        >
          {showForm ? (
            <X
              className="text-gray-700"
              width={20}
              height={20}
              strokeWidth={2}
            ></X>
          ) : (
            <ArrowUp
              className="text-gray-700"
              width={20}
              height={20}
              strokeWidth={2}
            ></ArrowUp>
          )}
        </div>
        <h1 className="text-lg font-semibold text-gray-700 text-center select-none!">
          Register to PubMarket
        </h1>
        <form action={formAction} className="px-10 flex flex-col gap-3">
          <div className="flex items-center gap-2 bg-gray-300 px-5 py-3 rounded-md outline-[2px] outline-gray-400 focus:outline-[2px] focus:outline-gray-400">
            <input
              type="text"
              className="text-[] border-none w-full bg-transparent outline-none"
              placeholder="Username"
            />
            <User className="text-gray-700" strokeWidth={2}></User>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex items-center gap-2 bg-gray-300 px-5 py-3 rounded-md outline-[2px] outline-gray-400 focus:outline-[2px] focus:outline-gray-400">
              <input
                type={showCreatePwd ? "text" : "password"}
                className="border-none w-full bg-transparent outline-none"
                placeholder="Create password"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-300 px-5 py-3 rounded-md outline-[2px] outline-gray-400 focus:outline-[2px] focus:outline-gray-400">
              <input
                type={showConfirmPwd ? "text" : "password"}
                className="border-none w-full bg-transparent outline-none"
                placeholder="Confirm password"
              />
            </div>
          </div>
          {/* <div className="flex items-center gap-2 bg-gray-300 px-5 py-3 rounded-md outline-[2px] outline-gray-400 focus:outline-[2px] focus:outline-gray-400">
            <input
              type="checkbox"
              className="border-none w-full bg-transparent outline-none"
              id="terms-checkbox-invalid"
            />
            <label htmlFor="terms-checkbox-invalid">
              Accept terms and conditions
            </label>
          </div> */}
          {/* <FieldGroup className="mx-auto w-56">
            <Field orientation="horizontal" data-invalid>
              <Checkbox
                id="terms-checkbox-invalid"
                name="terms-checkbox-invalid"
                aria-invalid
              />
              <FieldLabel htmlFor="terms-checkbox-invalid">
                Accept terms and conditions
              </FieldLabel>
            </Field>
          </FieldGroup> */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gray-300 px-5 py-3 rounded-md outline-[2px] outline-none focus:outline-[2px] focus:outline-gray-400 bg-[#f43f5e]! text-white font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed select-none"
          >
            {isPending ? "Signing up..." : "Signup"}
          </button>
          <div className="flex items-center px-1 mx-auto w-full">
            <p className="text-center font-custom text-[12px] font-medium text-gray-700 select-none cursor-pointer mx-auto pl-5">
              <span>Already have an account?</span>
              <span className="hover:text-[#f43f5e] hover:cursor-pointer duration-200 ml-1 font-bold">
                <Link href="/auth/login">Login</Link>
              </span>
            </p>
          </div>
        </form>
        <OptionalAccounts />
      </div>
    </>
  );
}
