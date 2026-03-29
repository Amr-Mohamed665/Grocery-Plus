import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// get all smart lists
export async function GET() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/smart-lists`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to get smart lists" },
        { status: 500 },
      );
    }

    const data = await res.json();


    const response = NextResponse.json({ smartLists: data.data });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// add smart list
export async function POST(request: Request) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const incomingFormData = await request.formData();
    const formData = new FormData();

    for (const [key, value] of incomingFormData.entries()) {
      if (value instanceof File) {
        const buffer = await value.arrayBuffer();
        const blob = new Blob([buffer], { type: value.type });
        formData.append(key, blob, value.name);
      } else {
        formData.append(key, value);
      }
    }

    const res = await fetch(`${process.env.BASE_URL}/api/smart-lists`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Backend error:", res.status, errorData);
      return NextResponse.json(
        { message: errorData.message || "Failed to add smart list" },
        { status: res.status },
      );
    }

    const data = await res.json();

    const response = NextResponse.json({ smartLists: data.data });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
