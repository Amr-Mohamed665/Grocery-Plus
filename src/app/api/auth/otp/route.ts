import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  if (!process.env.BASE_URL) {
    return NextResponse.json(
      { message: "Server configuration error: BASE_URL is not defined" },
      { status: 500 },
    );
  }

  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const req = await request.json();

    const res = await fetch(`${process.env.BASE_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("OTP BACKEND ERROR:", errorData || res.statusText);
      return NextResponse.json(
        errorData || { message: "Failed to verify OTP" },
        { status: res.status },
      );
    }

    const data = await res.json();

    const response = NextResponse.json({ user: data.data });

    return response;
  } catch (error) {
    console.error("OTP ROUTE ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
