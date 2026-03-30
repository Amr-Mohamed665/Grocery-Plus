"use client";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { useAllCart, useUpdateCart, useDeleteFromCart } from "@/hooks/cart/useCart";
import { CartItem } from "@/hooks/use-cart";
import CartSummarySkeleton from "./CartSummarySkeleton";

type CartSummaryProps = {
  quantity: number;
  totalH: number;
  readOnly?: boolean;
};

export default function CartSummary({ quantity, totalH, readOnly = false }: CartSummaryProps) {
  const { data, isLoading, isError } = useAllCart();
  const { mutate: updateCart, isPending: isUpdating } = useUpdateCart();
  const { mutate: deleteCartItem, isPending: isDeleting } = useDeleteFromCart();

  if (isLoading) return <CartSummarySkeleton />;
  if (isError) return <p>Error loading cart</p>;

  const safeItems: CartItem[] = Array.isArray(data?.cart?.items)
    ? data.cart.items
    : [];

  const subtotal = data?.cart?.subtotal || "0";
  const total = data?.cart?.total || "0";

  return (
    <div className="w-full lg:w-[500px]">
      <p className="font-medium text-lg lg:text-xl mb-2">Cart Summary</p>

      <div className="w-full border border-gray-200 pl-4 lg:pl-6 shadow-sm rounded-md">
        {/* ===== Products Scroll Area ===== */}
        <div className="max-h-[400px] lg:max-h-[565px] px-2 overflow-y-auto custom-scroll">
          {safeItems.length === 0 && (
            <p className="text-center py-10 text-gray-500">
              Your cart is empty
            </p>
          )}
          {safeItems.map((item) => (
            <div
              key={item.id}
              className="w-full border-b border-gray-300 flex gap-4 lg:gap-6 py-4 lg:py-6"
            >
              {/* Image */}
              <div className="flex flex-col items-center">
                <Image
                  src={item.meal.image_url}
                  alt={item.meal.title}
                  width={70}
                  height={70}
                  className="object-cover"
                />
                <div className="bg-[#0E1112] text-[11px] text-center rounded-tl-[15px] rounded-br-[15px] px-2 mt-2">
                  <p className="text-[#F7FCFF]">In Stock</p>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1">
                <p className={`font-normal ${readOnly ? 'text-lg lg:text-xl' : 'text-base lg:text-lg'}`}>
                  {item.meal.title}
                </p>

                <div className="flex justify-between items-center pt-3 gap-3 w-full">
                  {/* Quantity - Show static amount if readOnly, otherwise show counter */}
                  {readOnly ? (
                    <p className="font-medium text-base sm:text-lg lg:text-xl">
                      Qty: {item.quantity}
                    </p>
                  ) : (
                    <div className="flex items-center border border-gray-200 gap-2 px-2 py-1 rounded-xl">
                      <button
                        type="button"
                        disabled={isUpdating || isDeleting}
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateCart({ mealId: String(item.meal.id), quantity: item.quantity - 1 });
                          } else {
                            deleteCartItem(String(item.meal.id));
                          }
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-40 cursor-pointer"
                      >
                        {item.quantity === 1
                          ? <Trash2 className="w-4 h-4 text-red-500" />
                          : <Minus className="w-4 h-4" />
                        }
                      </button>

                      <p className="font-normal text-sm sm:text-base min-w-[20px] text-center">
                        {item.quantity}
                      </p>

                      <button
                        type="button"
                        disabled={isUpdating || isDeleting}
                        onClick={() => {
                          updateCart({ mealId: String(item.meal.id), quantity: item.quantity + 1 });
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-40 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Price */}
                  <div className="font-medium text-sm sm:text-base lg:text-xl md:mr-20 mr-10">
                    £ {Number(item.unit_price).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Total Section ===== */}
        <div>
          <div className="py-4 pr-4 lg:pr-7">
            <p className="text-[#014162] font-medium text-lg lg:text-xl">
              Total Amount
            </p>

            <div className="flex flex-col gap-2 pt-4 pb-3 border-b border-gray-200">
              <div className="flex justify-between">
                <p className="text-[#6B6F75] text-sm lg:text-lg">Subtotal</p>
                <p className="text-[#6B6F75] text-sm lg:text-lg">
                  £ {Number(subtotal).toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-[#6B6F75] text-sm lg:text-lg">Shipping estimate</p>
                <p className="text-[#6B6F75] text-sm lg:text-lg">£ {(safeItems.length > 0 ? 25 : 0).toFixed(2)}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-[#6B6F75] text-sm lg:text-lg">Tax estimate</p>
                <p className="text-[#6B6F75] text-sm lg:text-lg">£ {Number(data?.cart?.tax || 0).toFixed(2)}</p>
              </div>
            </div>

            <div className="flex justify-between pt-3">
              <p className="font-medium text-base lg:text-lg">Order Total</p>
              <p className="text-base lg:text-lg font-normal">£ {(Number(subtotal) + (safeItems.length > 0 ? 25 : 0) + (data?.cart?.tax ? Number(data.cart.tax) : 0)).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
