import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!process.env.BASE_URL) {
    return NextResponse.json(
      { message: "Server configuration error: BASE_URL is not defined" },
      { status: 500 },
    );
  }

  try {
    // Fetch profile data from the database or an external API
    const res = await fetch(`${process.env.BASE_URL}/api/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("DASHBOARD BACKEND ERROR:", errorData || res.statusText);
      return NextResponse.json(
        errorData || { message: "Failed to fetch dashboard data" },
        { status: res.status },
      );
    }

    const userData = await res.json();

    return NextResponse.json(userData);
  } catch (error) {
    console.error("DASHBOARD ROUTE ERROR:", error);
    return NextResponse.json(
      { error: "the server is down by now" },
      { status: 500 },
    );
  }
}
