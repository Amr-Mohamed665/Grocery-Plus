"use client";

import { Mail } from "lucide-react";
import BgWhite from "../_components/BgWhite";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "@/lib/schemas/authSchemas";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import PupUp from "../_components/PupUp";
import Image from "next/image";
import otp from "@/assets/otp.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForgetPassword } from "@/hooks/auth/useAuth";

export default function ForgetPass() {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const { mutateAsync: forgetPassword } = useForgetPassword();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      identifier: "",
    },
  });

  const onClose = () => {
    router.push("/otp");
  };

  const onSubmit = (data: z.infer<typeof forgetPasswordSchema>) => {
    sessionStorage.setItem("identifier", data.identifier);
    forgetPassword(data, {
      onSuccess: () => {
        setShowPopup(true);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <BgWhite>
      <div className="info max-w-[400px] flex flex-col gap-1">
        <h2 className="text-[32px]  font-semibold">Password Recovery</h2>
        <p className="text-[16px] font-medium">
          Enter your Mobile Number to recover your password
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="email  space-y-2">
          <div className="relative emailInput">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 transition-colors" />
            <Input
              {...register("identifier")}
              className={`pl-10 py-6 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 transition-all ${errors.identifier && "focus-visible:ring-red-500 border-red-500"}`}
              type="email"
              placeholder="Sarahem@gmail.com"
            />
          </div>
          {errors.identifier && (
            <div className="text-xs font-medium text-red-500">
              {errors.identifier.message}
            </div>
          )}
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
            <p className="text-base font-medium text-[#898989] leading-[18px] text-center max-w-[279px]">
              OTP sent successfully. Please check your email{" "}
              {sessionStorage.getItem("identifier")}
            </p>
          </div>
        </PupUp>
      )}
    </BgWhite>
  );
}
