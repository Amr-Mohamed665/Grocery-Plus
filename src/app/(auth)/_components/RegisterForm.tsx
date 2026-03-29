"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas/authSchemas";
import z from "zod";
import { Mail, Lock, Eye, EyeClosed, User, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import PupUp from "./PupUp";
import Image from "next/image";
import checkMark from "@/assets/true.png";
import { useRegister } from "@/hooks/auth/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { mutateAsync: registerUser } = useRegister();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setApiError(null);
    const payload = {
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
      password_confirmation: data.password,
      agree_terms: data.agree_terms,
    };
    try {
      await registerUser(payload);
      toast.success("Signup successful! Please login.");
      router.push("/login");
    } catch (error: any) {
      let cleanError = error.message || "Signup failed. Please try again.";
      cleanError = cleanError.replace(/\s*\(and \d+ more errors?\)/i, "");
      
      // Determine which field the error relates to
      if (cleanError.toLowerCase().includes("email")) {
        setError("email", { message: cleanError });
      } else if (cleanError.toLowerCase().includes("username")) {
        setError("username", { message: cleanError });
      } else if (cleanError.toLowerCase().includes("phone")) {
        setError("phone", { message: cleanError });
      } else if (cleanError.toLowerCase().includes("password")) {
        setError("password", { message: cleanError });
      } else {
        setApiError(cleanError);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="username  space-y-2">
        <div className="relative emailInput">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 transition-colors" />
          <Input
            {...register("username")}
            className={`pl-10 py-6 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 transition-all ${errors.username && "focus-visible:ring-red-500 border-red-500"}`}
            type="text"
            placeholder="Username"
          />
        </div>
        {errors.username && (
          <div className="text-xs font-medium text-red-500">
            {errors.username.message}
          </div>
        )}
      </div>

      <div className="email  space-y-2">
        <div className="relative emailInput">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 transition-colors" />
          <Input
            {...register("email")}
            className={`pl-10 py-6 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 transition-all ${errors.email && "focus-visible:ring-red-500 border-red-500"}`}
            type="email"
            placeholder="Sarahem@gmail.com"
          />
        </div>
        {errors.email && (
          <div className="text-xs font-medium text-red-500">
            {errors.email.message}
          </div>
        )}
      </div>

      <div className="phone  space-y-2">
        <div className="relative emailInput">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 transition-colors" />
          <Input
            {...register("phone")}
            className={`pl-10 py-6 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 transition-all ${errors.phone && "focus-visible:ring-red-500 border-red-500"}`}
            type="phone"
            placeholder="0123456789"
          />
        </div>
        {errors.phone && (
          <div className="text-xs font-medium text-red-500">
            {errors.phone.message}
          </div>
        )}
      </div>

      <div className="password space-y-2">
        <div className="relative passInput">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 transition-colors" />
          <Input
            {...register("password")}
            className={`pl-10 py-6 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 transition-all ${errors.password && "focus-visible:ring-red-500 border-red-500"}`}
            type={showPassword ? "text" : "password"}
            placeholder="********"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            {showPassword ? (
              <Eye className="size-5" />
            ) : (
              <EyeClosed className="size-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <div className="text-xs font-medium text-red-500">
            {errors.password.message}
          </div>
        )}
      </div>

      <div className="confirmPassword space-y-2">
        <div className="relative passInput">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 transition-colors" />
          <Input
            {...register("password_confirmation")}
            className={`pl-10 py-6 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 transition-all ${errors.password_confirmation && "focus-visible:ring-red-500 border-red-500"}`}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            {showConfirmPassword ? (
              <Eye className="size-5" />
            ) : (
              <EyeClosed className="size-5" />
            )}
          </button>
        </div>
        {errors.password_confirmation && (
          <div className="text-xs font-medium text-red-500">
            {errors.password_confirmation.message}
          </div>
        )}
      </div>

      <div className="terms space-y-2 pt-2">
        <div className="flex items-center gap-2 group">
          <input
            id="agree_terms"
            {...register("agree_terms")}
            type="checkbox"
            className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all"
          />
          <label
            htmlFor="agree_terms"
            className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer select-none group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors"
          >
            I agree to the{" "}
            <span className="text-blue-600 font-bold hover:underline">
              Terms and Conditions
            </span>
          </label>
        </div>
        {errors.agree_terms && (
          <p className="text-xs font-medium text-red-500">
            {errors.agree_terms.message}
          </p>
        )}
      </div>

      {apiError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {apiError}
        </div>
      )}

      <Button
        className="cursor-pointer w-full py-6 text-base font-bold bg-[linear-gradient(to_top,#01416280,#014162CC_80%)] hover:bg-[linear-gradient(to_top,#014162CC_50%,#014162FF_80%)] text-white rounded-xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all disabled:opacity-70"
        type="submit"
      >
        Sign Up
      </Button>

      {showPopup && (
        <PupUp onClose={() => setShowPopup(false)}>
          <div className="flex flex-col items-center gap-3">
            {/* Star Badge with Checkmark */}
            <div className="relative w-[120px] h-[120px] mb-3">
              <Image
                src={checkMark}
                alt="Star Badge"
                fill
                className="object-contain"
              />
            </div>

            {/* Text Content */}
            <h2 className="text-2xl font-semibold text-[#010000] leading-7 text-center">
              Welcome to Grocery +
            </h2>
            <p className="text-base font-medium text-[#898989] leading-[18px] text-center max-w-[279px]">
              Signup was successful, please login to continue.
            </p>

            <Button
              className="cursor-pointer w-full py-6 text-base font-bold bg-[linear-gradient(to_top,#01416280,#014162CC_80%)] hover:bg-[linear-gradient(to_top,#014162CC_50%,#014162FF_80%)] text-white rounded-xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all disabled:opacity-70"
              type="button"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </div>
        </PupUp>
      )}
    </form>
  );
}
