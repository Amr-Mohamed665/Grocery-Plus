import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/orders`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to get orders" },
        { status: 500 },
      );
    }

    const data = await res.json();

    const response = NextResponse.json({ orders: data.data });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request.body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to add orders" },
        { status: 500 },
      );
    }

    const data = await res.json();

    const response = NextResponse.json({ orders: data.data });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
