import { useQuery } from "@tanstack/react-query";

export type CartItem = {
  id: number;
  quantity: number;
  unit_price: string;
  subtotal: string;
  meal: {
    id: number;
    title: string;
    image_url: string;
    final_price: number;
    in_stock: boolean;
  };
};
export type CartAPIResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    status: string;
    items: CartItem[];
    item_count: number;
    subtotal: string;
    total: string;
    tax?: string;
    discount?: string;
    is_empty?: boolean;
    created_at?: string;
    updated_at?: string;
  };
};

async function getCart(): Promise<CartAPIResponse> {
  const response = await fetch("/api/cart");
  if (!response.ok) throw new Error("API Error");
  const payload: CartAPIResponse = await response.json();
  return payload;
}

export const useCart = () =>
  useQuery<CartAPIResponse, Error>({
    queryKey: ["my-cart-items"],
    queryFn: getCart,
  });
