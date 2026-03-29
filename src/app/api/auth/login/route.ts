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

    const res = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("LOGIN BACKEND ERROR:", errorData || res.statusText);
      return NextResponse.json(
        errorData || { message: "Failed to login" },
        { status: res.status },
      );
    }

    const data = await res.json();

    const response = NextResponse.json({ user: data.data.user });

    response.cookies.set("token", data.data.token, {
      httpOnly: true,
      path: "/",
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("LOGIN ROUTE ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
