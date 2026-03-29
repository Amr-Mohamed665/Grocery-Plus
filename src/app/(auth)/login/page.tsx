"use client";


import LoginForm from "../_components/LoginForm";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div
      className={`bg-[linear-gradient(#014162C7,#014162C7),url("@/assets/authBg.png")] min-h-screen w-full flex flex-col lg:flex-row items-center justify-center overflow-x-hidden relative`}
    >
      {/* left side */}
      <div
        className={`hidden lg:flex flex-col items-start justify-center w-1/2 h-screen px-20 text-white z-10 space-y-4`}
      >
        <div className="pt-6">
          <div className="flex -space-x-3 mb-4"></div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 py-12 px-6 sm:px-12 md:px-16 lg:px-24 z-20 lg:rounded-l-[3rem] shadow-[-20px_0_60px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center lg:items-start justify-center w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
          <header className="space-y-2 text-center lg:text-left w-full">
            <h1 className="text-maroon-700 text-3xl md:text-4xl font-extrabold tracking-tight">
              Login your account!
            </h1>
            <p className="text-slate-500 font-bold text-lg">
              Welcome to{" "}
              <span className="text-slate-900 dark:text-white">
                Grocery Plus
              </span>
            </p>
          </header>

          <LoginForm />

          {/* Divider */}
          <div className="w-full flex items-center gap-4 py-2">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Or Continue With
            </span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 transition shadow-sm hover:shadow active:scale-[0.98] cursor-pointer">
              <FcGoogle className="size-6" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
                Google
              </span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 transition shadow-sm hover:shadow active:scale-[0.98] cursor-pointer">
              <FaFacebook className="size-6 text-[#1877F2]" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
                Facebook
              </span>
            </button>
          </div>

          <footer className="w-full pt-4 text-center lg:text-left">
            <p className="text-slate-600 text-center font-medium">
              Don't have an Account?{" "}
              <Link
                href={"/register"}
                className="text-blue-600 hover:text-blue-700 font-bold transition"
              >
                Sign Up
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
