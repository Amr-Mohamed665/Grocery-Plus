// Icons
import { ShoppingCart, ChevronRight, Calendar } from "lucide-react";

// Next
import Link from "next/link";

// Hooks
import { useAllCart } from "@/hooks/cart/useCart";

// Types
import { DashboardData } from "@/lib/types/dashboard";

type CardDeliverProps = {
  dashboardData: DashboardData | null;
};

export default function CardDeliver({ dashboardData }: CardDeliverProps) {
  const { data: cartData } = useAllCart();
  
  // Get actual cart items count and total from cart API
  const cartItemsCount = cartData?.cart?.items?.length || 0;
  const subtotal = Number(cartData?.cart?.subtotal || 0);
  const tax = Number(cartData?.cart?.tax || 0);
  const shipping = cartItemsCount > 0 ? 25 : 0;
  const orderTotal = subtotal + shipping + tax;
  
  // this logic because the last_updated is not a date it saved as a string
  const currentCart = dashboardData?.overview?.current_cart;
  let timeDisplay = "0 mins";

  if (currentCart?.last_updated) {
    const last = new Date(currentCart.last_updated).getTime();
    if (!isNaN(last)) {
      const now = new Date().getTime();
      const diffMs = now - last;
      const minutes = Math.floor(diffMs / (1000 * 60));

      if (minutes < 60) {
        timeDisplay = `${minutes} mins`;
      } else {
        const hours = Math.floor(minutes / 60);
        timeDisplay = `${hours} hours`;
      }
    }
  }

  return (
    <div className="Cart-Deliver flex flex-wrap gap-6 justify-between items-center">
      <div className="Cart flex-1 min-w-85 h-60 rounded-xl border-[0.8px] p-6 flex flex-col gap-4 shadow-[-1px_0px_4px_0px_#01416240] transition-all duration-300 hover:shadow-[0px_8px_16px_rgba(1,65,98,0.15)] hover:-translate-y-1 hover:border-[#014162]">
        <div className="head min-w-85 h-8.75 flex items-center justify-between gap-15">
          <div className="title flex items-center gap-3">
            <ShoppingCart className="text-[#014162]" />
            <p className="font-medium text-[#014162] text-[16px] leading-[19.2px] tracking-[0px]">
              Current Cart
            </p>
          </div>
          <button className="button cursor-pointer bg-[#BCB8B1] text-[#014162] h-8.75 rounded-xl flex items-center justify-center gap-1 pt-2 pb-2 pl-1.5 pr-1.5 transition-colors hover:bg-[#A8A49D]">
            View Cart
          </button>
        </div>
        <div className="items flex gap-4 bg-[#F7FCFF] rounded-[10px] min-w-70.5 p-2 justify-between items-center px-3 shadow-[0px_2px_4px_0px_#01416240]">
          <div className="flex flex-col gap-1  ">
            <p className="font-normal text-[16px] leading-[19.2px]">
              {cartItemsCount} items in cart
            </p>
            <p className="font-normal text-[12px] leading-4.5">
              Last updated: {timeDisplay} ago
            </p>
          </div>
          <p className="font-inter font-normal text-[16px] leading-[19.2px]">
            £ {orderTotal.toFixed(2)}
          </p>
        </div>
        <Link
          className="cursor-pointer  justify-center   text-[#F7FCFF] font-normal text-[16px] leading-[19.2px] bg-[#014162] min-w-70.5 h-10 rounded-xl flex items-center gap-1 p-2 transition-all hover:bg-[#025a8a] shadow-md hover:shadow-lg"
          href="/"
        >
          Continue Shopping <ChevronRight className="ml-1" />
        </Link>
      </div>

      <div className="Cart flex-1 min-w-85 h-60 rounded-xl border-[0.8px] p-6 flex flex-col gap-4 shadow-[-1px_0px_4px_0px_#01416240] transition-all duration-300 hover:shadow-[0px_8px_16px_rgba(1,65,98,0.15)] hover:-translate-y-1 hover:border-[#014162]">
        <div className="head w-full h-8.75 flex items-center justify-between gap-15">
          <div className="title flex items-center gap-3">
            <Calendar className="text-[#014162]" />
            <p className="font-medium text-[#014162] text-[16px] leading-[19.2px] tracking-[0px]">
              Upcoming Delivery
            </p>
          </div>
          <button className="button cursor-pointer bg-[#BCB8B1] text-[#014162] h-8.75 rounded-xl flex items-center justify-center gap-1 pt-2 pb-2 pl-1.5 pr-1.5 transition-colors hover:bg-[#A8A49D]">
            Track
          </button>
        </div>

        <div className="items flex gap-4 bg-[#F7FCFF] rounded-[10px] min-w-70.5 p-2 justify-between items-center px-3 shadow-[0px_2px_4px_0px_#01416240]">
          <div className="flex flex-col gap-1  ">
            <p className="font-normal text-[16px] leading-[19.2px]">
              {dashboardData?.overview?.upcoming_delivery?.items_count || "0"}{" "}
              items in cart
            </p>
            <p className="font-normal text-[12px] leading-4.5">
              {dashboardData?.overview?.upcoming_delivery?.from || "00:00"} -{" "}
              {dashboardData?.overview?.upcoming_delivery?.to || "00:00"}
            </p>
            <p className="font-normal text-[12px] leading-4.5">
              Order{" "}
              {dashboardData?.overview?.upcoming_delivery?.code || "#0000"}
            </p>
          </div>
        </div>
        <Link
          className="cursor-pointer  justify-center   text-[#F7FCFF] font-normal text-[16px] leading-[19.2px] bg-[#014162] min-w-70.5 h-10 rounded-xl flex items-center gap-1 p-2 transition-all hover:bg-[#025a8a] shadow-md hover:shadow-lg"
          href="#"
        >
          View Details <ChevronRight className="ml-1" />
        </Link>
      </div>
    </div>
  );
}
