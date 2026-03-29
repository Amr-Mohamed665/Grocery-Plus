import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// get all addresses
export async function GET() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/addresses`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to get addresses" },
        { status: 500 },
      );
    }

    const data = await res.json();

    const response = NextResponse.json({ addresses: data.data });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// add address
export async function POST(request: Request) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    const req = await request.json();

    const res = await fetch(`${process.env.BASE_URL}/api/addresses`, {
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
      return NextResponse.json(
        { error: "Failed to add address", backend: errorData },
        { status: res.status },
      );
    }

    const data = await res.json();

    const response = NextResponse.json({ addresses: data.data });

    return response;
  } catch (error) {
    console.error("ADDRESS POST ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
