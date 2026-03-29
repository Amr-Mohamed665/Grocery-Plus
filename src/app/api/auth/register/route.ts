import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.BASE_URL) {
    return NextResponse.json(
      { message: "Server configuration error: BASE_URL is not defined" },
      { status: 500 },
    );
  }

  try {
    const req = await request.json();

    const res = await fetch(`${process.env.BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("REGISTER BACKEND ERROR:", errorData || res.statusText);
      return NextResponse.json(
        errorData || { message: "Failed to register" },
        { status: res.status },
      );
    }

    const data = await res.json();

    const response = NextResponse.json({ user: data.data.user });

    response.cookies.set("token", data.data.token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("REGISTER ROUTE ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
