import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const { id } = await params;

    const res = await fetch(`${process.env.BASE_URL}/api/categories/${id}/meals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to get category" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json({ meals: data.data });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}