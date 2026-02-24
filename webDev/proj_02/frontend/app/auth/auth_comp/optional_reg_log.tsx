"use client";
import { User, Eye, EyeOff, Mail } from "lucide-react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
export default function OptionalAccounts({disabled}: {disabled: boolean}) {
  return (
    <>
      <div className="flex items-center justify-center gap-5 px-10 mx-auto w-full">
        <button className="group bg-gray-300 px-5 py-5 rounded-[120%] outline-[2px] outline-gray-300 focus:outline-[2px] focus:outline-gray-400 hover:bg-gray-200 transition duration-200" disabled={!disabled}>
          <FaGoogle
            className={`!group-hover:text-[#f43f5e] text-gray-700 text-2xl transition duration-200 ${disabled ? 'text-gray-500' : 'text-gray-700'}`}
            strokeWidth={2}
          ></FaGoogle>
        </button>
        <button className="group bg-gray-300 px-5 py-5 rounded-[120%] outline-[2px] outline-gray-300 focus:outline-[2px] focus:outline-gray-400 cursor-pointer hover:bg-gray-200 transition duration-200" disabled={disabled}>
          <FaFacebook
            className={`!group-hover:text-[#f43f5e] text-gray-700 text-2xl transition duration-200 ${disabled ? 'text-gray-500' : 'text-gray-700'}`}
            strokeWidth={2}
          ></FaFacebook>
        </button>
        <button className="group bg-gray-300 px-5 py-5 rounded-[120%] outline-[2px] outline-gray-300 focus:outline-[2px] focus:outline-gray-400 hover:bg-gray-200 transition duration-200"
        disabled={disabled}>
          <FaApple
            className={`!group-hover:text-[#f43f5e] text-gray-700 text-2xl transition duration-200 ${disabled ? 'text-gray-500' : 'text-gray-700'}`}
            strokeWidth={2}
          ></FaApple>
        </button>
      </div>
    </>
  );
}
