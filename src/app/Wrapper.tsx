"use client";

import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const protectedRoutes = [
    "/login",
    "/register",
    "/forget-pass",
    "/reset-pass",
    "/otp",
    "/set-new-pass",
  ];

  if (protectedRoutes.includes(pathname)) {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      {children}
      <Footer />
    </QueryClientProvider>
  );
}
