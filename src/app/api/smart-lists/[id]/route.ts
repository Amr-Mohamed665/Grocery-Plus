import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// get smart list by id
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const { id } = await params;

    const res = await fetch(`${process.env.BASE_URL}/api/smart-lists/${id}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to get smart list" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json({ smartList: data.data });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// update smart list by id
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  try {
    const req = await request.json();
    const { id } = await params;

    const res = await fetch(`${process.env.BASE_URL}/api/smart-lists/${id}`, {
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
        { error: "Failed to update smart list" },
        { status: 500 },
      );
    }

    const updatedData = await res.json();

    return NextResponse.json(updatedData);
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to update smart list ${err}` },
      { status: 500 },
    );
  }
}

// delete smart list by id
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const { id } = await params;

    const res = await fetch(`${process.env.BASE_URL}/api/smart-lists/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to delete smart list" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json({ smartList: data.data });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
