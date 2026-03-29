import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  if (!process.env.BASE_URL) {
    return NextResponse.json(
      { message: "Server configuration error: BASE_URL is not defined" },
      { status: 500 },
    );
  }

  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    const res = await fetch(`${process.env.BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("LOGOUT BACKEND ERROR:", errorData || res.statusText);
      return NextResponse.json(
        errorData || { message: "Failed to logout" },
        { status: res.status },
      );
    }

    cookiesStore.delete("token");

    const response = NextResponse.json({ message: "Logged out successfully" });

    return response;
  } catch (error) {
    console.error("LOGOUT ROUTE ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
