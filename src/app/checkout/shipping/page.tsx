"use client";

import ProgressBar from "./components/ProgressBar";
import Info from "./components/Info";
import Loading from "@/components/common/Loading";
import { useAllCart } from "@/hooks/cart/useCart";

export default function Home() {
  const { isLoading } = useAllCart();

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="max-w-[1150px] mx-auto px-4 py-4">
        <h1 className="font-medium text-lg lg:text-xl">Checkout (shipping)</h1>
      </div>
      <ProgressBar />
      <Info />
    </>
  );
}
