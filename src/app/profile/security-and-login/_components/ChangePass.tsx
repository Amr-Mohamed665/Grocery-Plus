"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/lib/schemas/authSchemas";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePass() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: z.infer<typeof changePasswordSchema>) => {
    console.log(data);
  };

  return (
    <div className="bg-[#f7fcff] border border-[#dad8d8] rounded-lg p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-[#0e1112]">Change Password</h3>
        </div>

        <p className="text-[rgba(0,0,0,0.48)] pl-8">
          Enter a new password to replace the old password
        </p>

        {/* Current Password */}
        <div className="pl-8 flex flex-col gap-4">
          <div>
            <label className="block text-[#0e1112] mb-2">
              Current Password
            </label>
            <div className="bg-white border border-[#dad8d8] rounded-lg p-3 flex items-center gap-3">
              <input
                type={showCurrentPassword ? "text" : "password"}
                {...register("current_password")}
                placeholder="Enter Current Password"
                className="flex-1 text-[#888] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="text-[#888]"
              >
                {showCurrentPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {errors.current_password && (
              <p className="text-red-500 text-xs">
                {errors.current_password.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-[#0e1112] mb-2">New Password</label>
            <div className="bg-white border border-[#dad8d8] rounded-lg p-3 flex items-center gap-3">
              <input
                type={showNewPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter New Password"
                className="flex-1 text-[#888] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="text-[#888]"
              >
                {showNewPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[#0e1112] mb-2">
              Confirm New Password
            </label>
            <div className="bg-white border border-[#dad8d8] rounded-lg p-3 flex items-center gap-3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("password_confirmation")}
                placeholder="Confirm New Password"
                className="flex-1 text-[#888] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-[#888]"
              >
                {showConfirmPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="text-red-500 text-xs">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          {/* Password Requirements */}
          <div>
            <p className="text-xs text-[#0e0101] mb-2">
              Your password must contain:
            </p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span
                //   className={`text-xs ${hasMinLength ? "text-[#014162]" : "text-[#0e0101]"}`}
                >
                  At least 6 characters
                </span>
              </div>
              <div className="flex items-center gap-2">
                {" "}
                <span
                //   className={`text-xs ${hasNumber ? "text-[#014162]" : "text-[#0e0101]"}`}
                >
                  Contains a number
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          //   disabled={!hasMinLength || !hasNumber || !passwordsMatch}
          className="cursor-pointer bg-[#014162] text-white py-2 px-6 rounded-lg w-[200px] disabled:opacity-50"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
