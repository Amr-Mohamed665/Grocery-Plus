import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// GET profile data
// export async function GET() {
//   const cookiesStore = await cookies();
//   const token = cookiesStore.get("token")?.value;
//   try {
//     const res = await fetch(`${process.env.BASE_URL}/api/profile`, {
//       headers: {
//         "Content-Type": "application/json",
//         accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const userData = await res.json();
//     if (!res.ok) {
//       console.error("Backend error fetching profile:", res.status, userData);
//       return NextResponse.json(userData, { status: res.status });
//     }
//     return NextResponse.json(userData);
//   } catch (error) {
//     console.error("catch error with GET profile data:", error);
//     return NextResponse.json(
//       { error: "the server is down by now" },
//       { status: 500 },
//     );
//   }
// }

// PUT update profile data
export async function PUT(request: Request) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  try {
    const req = await request.json();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      accept: "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${process.env.BASE_URL}/api/profile/info`, {
      method: "PUT",
      headers,
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to update profile data" },
        { status: 500 },
      );
    }

    const updatedData = await res.json();

    return NextResponse.json(updatedData);
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to update profile data ${err}` },
      { status: 500 },
    );
  }
}

// Update profile image
export async function POST(request: Request) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  try {
    const formData = await request.formData();

    const headers: Record<string, string> = {
      accept: "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${process.env.BASE_URL}/api/profile/image`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to update profile image" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Upload image error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
