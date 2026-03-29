import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const { id } = await params;

    const res = await fetch(`${process.env.BASE_URL}/api/meals/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to get meal" },
        { status: 500 },
      );
    }

    const data = await res.json();

    const response = NextResponse.json({ meal: data.data });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
