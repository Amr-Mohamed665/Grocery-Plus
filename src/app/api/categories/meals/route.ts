import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  if (!process.env.BASE_URL) {
    return NextResponse.json(
      { message: "Server configuration error: BASE_URL is not defined" },
      { status: 500 },
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.toString();

    const res = await fetch(`${process.env.BASE_URL}/api/meals?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("MEALS BACKEND ERROR:", errorData || res.statusText);
      return NextResponse.json(
        errorData || { message: "Failed to fetch meals" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("MEALS ROUTE ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
