import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// get address by id
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const { id } = await params;

    const res = await fetch(`${process.env.BASE_URL}/api/addresses/${id}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to get address" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json({ address: data.data });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// update address by id
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  try {
    const req = await request.json();
    const { id } = await params;

    const res = await fetch(`${process.env.BASE_URL}/api/addresses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to update address" },
        { status: 500 },
      );
    }

    const updatedData = await res.json();

    return NextResponse.json(updatedData);
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to update address ${err}` },
      { status: 500 },
    );
  }
}

// delete address by id
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const { id } = await params;

    const res = await fetch(`${process.env.BASE_URL}/api/addresses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to delete address" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json({ address: data.data });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
