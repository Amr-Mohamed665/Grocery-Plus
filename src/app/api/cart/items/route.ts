import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    const req = await request.json();

    const res = await fetch(`${process.env.BASE_URL}/api/cart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.log(errorData);
      return NextResponse.json(
        { error: "Failed to add item to cart", backend: errorData },
        { status: res.status },
      );
    }

    const data = await res.json();

    const response = NextResponse.json({ cart: data.data.cart });

    return response;
  } catch (error) {
    console.error("ADD ITEM TO CART ROUTE ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
