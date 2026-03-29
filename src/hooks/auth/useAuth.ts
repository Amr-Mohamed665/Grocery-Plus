import { useMutation } from "@tanstack/react-query";

// login api
async function loginUser(data: { login: string; password: string }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error("Failed to login");
  }
  const userData = await res.json();
  return userData;
}

// register api
async function registerUser(data: {
  username: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  agree_terms: boolean;
}) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to register");
  }
  const newUser = await res.json();
  return newUser;
}
// forget password api
async function forgetPassword(data: { identifier: string | null }) {
  const res = await fetch("/api/auth/forgetPass", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error("Failed to forget password");
  }
  const newUser = await res.json();
  return newUser;
}

// otp api
async function otpUser(data: { otp: string; identifier: string | null }) {
  const res = await fetch("/api/auth/otp", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok)  {
    const errorData = await res.json().catch(() => null);
    throw new Error("Failed to otp");
  }
  const otpCode = await res.json();
  return otpCode;
}

// reset password api
async function resetPassword(data: {
  otp: string | null;
  identifier: string | null;
  password: string;
  password_confirmation: string;
}) {
  const res = await fetch("/api/auth/resetPass", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to reset password");
  const resetPassword = await res.json();
  return resetPassword;
}

// logout api
async function logoutUser() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!res.ok) throw new Error("Failed to logout");
  const logoutUser = await res.json();
  return logoutUser;
}

// delete user api
async function deleteUser(data: {
  name: string | null;
  email: string | null;
  subject: string | null;
  message: string | null;
}) {
  const res = await fetch("/api/auth/deleteUser", {
    method: "DELETE",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to delete user");
  const deleteUser = await res.json();
  return deleteUser;
}

////////////////////////////
// hooks for auth //////////
////////////////////////////

// register hook
export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
  });
}

// login hook
export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
  });
}

// forget password hook
export function useForgetPassword() {
  return useMutation({
    mutationFn: forgetPassword,
  });
}

// otp hook
export function useOtp() {
  return useMutation({
    mutationFn: otpUser,
  });
}

// otp hook
export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}

// logout hook
export function useLogout() {
  return useMutation({
    mutationFn: logoutUser,
  });
}

// delete user hook
export function useDeleteUser() {
  return useMutation({
    mutationFn: deleteUser,
  });
}
