"use client";
import CartSummary from "../../components/CartSummary";

export default function OrderSummary() {
  return (
    <section className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-24 my-10 px-4 sm:px-0">
      {/* ================= Cart Summary ================= */}
      <CartSummary quantity={1} totalH={0} />
    </section>
  );
}
