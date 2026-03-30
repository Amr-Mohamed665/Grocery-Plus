"use client";
import CartSummary from "../../components/CartSummary";

export default function OrderSummary() {
  return (
    <section className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-24 mt-10 px-4">
      {/* ================= Order Summary ================= */}
      <div className="w-full lg:w-[500px]">
        <CartSummary quantity={0} totalH={1} />
      </div>
    </section>
  );
}
