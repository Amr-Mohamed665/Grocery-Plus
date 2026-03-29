"use client";

import { ShieldCheck, CircleCheck, Eye, EyeOff } from "lucide-react";
import BgWhite from "../_components/BgWhite";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/schemas/authSchemas";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import PupUp from "../_components/PupUp";
import Image from "next/image";
import otp from "@/assets/otp.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { useResetPassword } from "@/hooks/auth/useAuth";

export default function ResetPass() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { mutateAsync: resetPassword } = useResetPassword();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onClose = () => {
    router.push("/profile");
  };

  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    const identifier = sessionStorage.getItem("identifier");
    const otp = sessionStorage.getItem("otp");
    const payload = {
      ...data,
      identifier: identifier,
      otp: otp,
    };
    resetPassword(payload).then(() => {
      setShowPopup(true);
    });
  };
  return (
    <BgWhite>
      <div className="info max-w-[400px] items-center flex flex-col gap-1">
        <h2 className="text-[32px]  font-semibold">Reset your password</h2>
        <p className="text-[16px] font-medium">
          Please enter your new password
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="newPassword  space-y-2 flex flex-col gap-1">
          <Label>New Password</Label>
          <div className="relative passwordInput">
            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#014162] transition-colors" />
            <Input
              {...register("password")}
              className={`pl-10 py-6 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 transition-all ${errors.password && "focus-visible:ring-red-500 border-red-500"}`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <Eye className="size-5 text-[#014162]" />
              ) : (
                <EyeOff className="size-5 text-[#014162]" />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="text-xs font-medium text-red-500">
              {errors.password.message}
            </div>
          )}
        </div>

        <div className="confirmPassword  space-y-2 flex flex-col gap-1">
          <Label>Confirm New Password</Label>
          <div className="relative passwordInput">
            <CircleCheck className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#014162] transition-colors" />
            <Input
              {...register("password_confirmation")}
              className={`pl-10 py-6 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 transition-all ${errors.password && "focus-visible:ring-red-500 border-red-500"}`}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <Eye className="size-5 text-[#014162]" />
              ) : (
                <EyeOff className="size-5 text-[#014162]" />
              )}
            </button>
          </div>
          {errors.password_confirmation && (
            <div className="text-xs font-medium text-red-500">
              {errors.password_confirmation.message}
            </div>
          )}
        </div>

        <div className="data flex flex-col gap-2">
          <p className="text-[12px] font-normal  text-[#0E0101]">
            your password must contain :
          </p>
          <div className="rol flex flex-col items-start gap-1">
            <p className="rol1 text-[12px] font-normal  text-[#0E0101] flex items-center gap-2">
              <CircleCheck className="size-5 text-[#014162]" />
              At least 8 characters
            </p>
            <p className="rol2 text-[12px] font-normal  text-[#0E0101] flex items-center gap-2">
              <CircleCheck className="size-5 text-[#014162]" />
              Contain a number
            </p>
          </div>
        </div>

        <Button
          className="cursor-pointer w-full py-6 text-base font-bold bg-[#014162CC] hover:bg-[linear-gradient(to_top,#014162CC_50%,#014162FF_80%)] text-white rounded-xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all disabled:opacity-70"
          type="submit"
        >
          Verify
        </Button>
      </form>

      {showPopup && (
        <PupUp onClose={onClose}>
          <div className="flex flex-col items-center gap-3">
            {/* Star Badge with Checkmark */}
            <div className="relative w-[120px] h-[120px] mb-3">
              <Image
                src={otp}
                alt="Star Badge"
                fill
                className="object-contain"
              />
            </div>

            {/* Text Content */}
            <h2 className="text-2xl font-semibold text-[#010000] leading-7 text-center">
              Reset Was Successfully
            </h2>
            <p className="text-base font-medium text-[#898989] leading-[18px] text-center max-w-[279px]">
              You can now login to your account
            </p>
          </div>
          <Button
            className="cursor-pointer mt-5 w-full py-6 text-base font-bold bg-[#014162CC] hover:bg-[linear-gradient(to_top,#014162CC_50%,#014162FF_80%)] text-white rounded-xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all disabled:opacity-70"
            type="submit"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </PupUp>
      )}
    </BgWhite>
  );
}
