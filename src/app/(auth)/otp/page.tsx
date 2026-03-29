"use client";

import BgWhite from "../_components/BgWhite";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/lib/schemas/authSchemas";
import z from "zod";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import otp from "@/assets/otp.png";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useOtp, useForgetPassword } from "@/hooks/auth/useAuth";

export default function Otp() {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(90);
  const [identifier, setIdentifier] = useState("");
  const { mutate: otpCode } = useOtp();
  const { mutate: forgetPassword } = useForgetPassword();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Simplified Timer Effect
  useEffect(() => {
    const interval = setInterval(
      () => setTimer((prev) => (prev > 0 ? prev - 1 : 0)),
      1000,
    );
    setIdentifier(sessionStorage.getItem("identifier") || "");
    return () => clearInterval(interval);
  }, []);

  // Time formatting helper used in the UI
  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  // handle keydown
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    value: string,
    onChange: (val: string) => void,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const otpArray = value.padEnd(4, " ").split("");

      if (otpArray[index] !== " ") {
        otpArray[index] = " ";
        onChange(otpArray.join(""));
      } else if (index > 0) {
        otpArray[index - 1] = " ";
        onChange(otpArray.join(""));
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const onSubmit = (data: z.infer<typeof otpSchema>) => {
    const identifier = sessionStorage.getItem("identifier");
    sessionStorage.setItem("otp", data.otp);
    const payload = {
      ...data,
      identifier: identifier,
    };
    otpCode(payload, {
      onSuccess: () => {
        router.push("/reset-pass");
      },
    });
  };

  // handle resend otp
  const handleResendOtp = () => {
    const identifier = sessionStorage.getItem("identifier");
    const payload = {
      identifier: identifier,
    };
    forgetPassword(payload, {
      onSuccess: () => {
        setTimer(90);
      },
    });
  };
  return (
    <BgWhite>
      <div className="info max-w-[400px] flex flex-col items-center gap-1">
        <div className="icon w-[150px] h-[150px] relative">
          <Image src={otp} alt="otp" fill />
        </div>
        <h2 className="text-[32px]  font-semibold">Enter verification code</h2>
        <p className="text-[16px] text-center font-medium">
          We Send a code to {identifier}
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="email  space-y-2">
          <div className="relative emailInput">
            <Controller
              name="otp"
              control={control}
              render={({ field }) => {
                // Normalize value to always be 4 chars long with spaces for empty slots
                const value = (field.value || "").padEnd(4, " ");

                return (
                  <div className="flex gap-2 justify-center">
                    {[0, 1, 2, 3, 4, 5].map((index) => {
                      const char = value[index];
                      return (
                        <input
                          placeholder="_"
                          key={index}
                          ref={(el) => {
                            inputsRef.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={char === " " ? "" : char}
                          className="w-[40px] h-[45px] bg-[#EFEFEF] rounded-[4px] text-center text-[22px] font-normal focus:outline-none focus:border focus:border-[#1E429F]"
                          // onchange
                          onChange={(e) => {
                            const val = e.target.value;
                            // Allow only number input
                            if (val && !/^\d+$/.test(val)) return;

                            // Construct new OTP string preserving positions
                            const otpArray = value.split("");
                            otpArray[index] = val || " ";
                            const newOtp = otpArray.join("");

                            field.onChange(newOtp);

                            // Move focus to next input if a digit was entered
                            if (val && index < 5) {
                              inputsRef.current[index + 1]?.focus();
                            }
                          }}
                          // onpaste
                          onPaste={(e) => {
                            e.preventDefault();

                            const pasted = e.clipboardData
                              .getData("text")
                              .trim();

                            if (!/^\d{6}$/.test(pasted)) return;

                            field.onChange(pasted);
                            inputsRef.current[5]?.focus();
                          }}
                          // onkeydown
                          onKeyDown={(e) =>
                            handleKeyDown(e, index, value, field.onChange)
                          }
                        />
                      );
                    })}
                  </div>
                );
              }}
            />
          </div>
          {errors.otp && (
            <div className="text-xs text-center font-medium text-red-500">
              {errors.otp.message}
            </div>
          )}

          <p className="text-center text-[14px] font-normal text-[#6F767E]">
            Having trouble? Request a new OTP in {""}
            <span className="text-[#1E429F]">{formatTime(timer)}</span>
            <button
              type="button"
              disabled={timer > 0}
              onClick={() => {
                handleResendOtp();
              }}
              className={`font-semibold text-[16px] ${
                timer > 0
                  ? "text-[#6F767E] cursor-not-allowed"
                  : "text-[#2A85FF] cursor-pointer"
              }`}
            >
              Resend code
            </button>
          </p>
        </div>

        <Button
          className="cursor-pointer w-full py-6 text-base font-bold bg-[#014162CC] hover:bg-[linear-gradient(to_top,#014162CC_50%,#014162FF_80%)] text-white rounded-xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all disabled:opacity-70"
          type="submit"
        >
          Verify
        </Button>
      </form>
    </BgWhite>
  );
}
