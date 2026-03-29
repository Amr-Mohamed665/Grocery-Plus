import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// set address as default
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  try {
    const { id } = await params;

    const res = await fetch(`${process.env.BASE_URL}/api/addresses/${id}/set-default`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to set address as default" },
        { status: 500 },
      );
    }

    const updatedData = await res.json();

    return NextResponse.json(updatedData);
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to set address as default ${err}` },
      { status: 500 },
    );
  }
}