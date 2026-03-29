"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas/authSchemas";
import z from "zod";
import { Mail, Lock, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/auth/useAuth";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutateAsync: loginUser, isPending, isError } = useLogin();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      await loginUser(data);
      toast.success("Login successful!");
      window.location.href = "/";
    } catch (error: any) {
      const errorMsg = error.message || "Login failed. Please try again.";
      
      // Determine which field the error relates to
      if (errorMsg.toLowerCase().includes("email") || errorMsg.toLowerCase().includes("user")) {
        setError("login", { message: errorMsg });
      } else if (errorMsg.toLowerCase().includes("password")) {
        setError("password", { message: errorMsg });
      } else {
        setError("login", { message: errorMsg });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="email  space-y-2">
        <div className="relative emailInput">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 transition-colors" />
          <Input
            {...register("login")}
            className={`pl-10 py-6 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 transition-all ${errors.login && "focus-visible:ring-red-500 border-red-500"}`}
            type="email"
            placeholder="Sarahem@gmail.com"
          />
        </div>
        {errors.login && (
          <div className="text-xs font-medium text-red-500">
            {errors.login.message}
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

      <div className="pass flex items-center justify-between">
        <Link
          href="/forget-pass"
          className="text-[14px] font-normal text-[#041622] hover:text-[#041622]/80 transition-colors"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        className="cursor-pointer w-full py-6 text-base font-bold bg-[linear-gradient(to_top,#01416280,#014162CC_80%)] hover:bg-[linear-gradient(to_top,#014162CC_50%,#014162FF_80%)] text-white rounded-xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all disabled:opacity-70"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
