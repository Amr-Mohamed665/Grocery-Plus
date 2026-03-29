import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const { id } = await params;

  try {
    const body = await request.json();

    const res = await fetch(`${process.env.BASE_URL}/api/cart/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to update item in cart" },
        { status: 500 },
      );
    }

    const data = await res.json();

    const response = NextResponse.json({ cart: data.data });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/cart/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to delete item from cart" },
        { status: 500 },
      );
    }

    const data = await res.json();

    const response = NextResponse.json({ cart: data.data });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
