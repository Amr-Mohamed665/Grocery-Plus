import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CartSummary( {priceData}: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
      <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Order Summary
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between text-[#014162]">
          <span>Subtotal</span>
          <span className="font-medium text-[#014162 ]">
            £ {Number(priceData?.subtotal || 0).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-[#014162]">
          <span>Shipping estimate</span>
          <span className="font-medium text-[#014162 ]">
            £ {((priceData?.items?.length || 0) > 0 ? 25 : 0).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-[#014162]">
          <span>Tax estimate</span>
          <span className="font-medium text-[#014162 ]">
            £ {Number(priceData?.tax || 0).toFixed(2)}
          </span>
        </div>

        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-[#014162]">
              Order Total
            </span>
            <span className="text-2xl font-bold text-[#014162]">
              £ {((priceData?.subtotal || 0) + ((priceData?.items?.length || 0) > 0 ? 25 : 0) + (priceData?.tax || 0)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <Link
        href="/checkout/shipping"
        className="w-full flex items-center justify-center bg-[#014162] text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all active:scale-[0.98]"
      >
        Go to Checkout
      </Link>

      <p className="text-xs text-center text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1.5">
        <ShieldCheck size={14} className="text-zinc-400" />
        Secure checkout guarantees your data is protected.
      </p>
    </div>
  );
}
