import { NextRequest, NextResponse } from "next/server";

// Cache configuration
const CACHE_DURATION = 60; // 1 minute for most requests
const CACHE_DURATION_STATIC = 300; // 5 minutes for static data

// Paths that can be cached
const CACHEABLE_PATHS = [
  "/categories",
  "/meals",
  "/categories/meals",
  "/categories/newProduct",
  "/categories/bestSells",
];

// Helper to check if path is cacheable
const isCacheable = (path: string) => {
  return CACHEABLE_PATHS.some((p) => path.includes(p));
};

// Helper to get cache duration
const getCacheDuration = (path: string) => {
  if (path.includes("/categories") || path.includes("/meals")) {
    return CACHE_DURATION_STATIC;
  }
  return CACHE_DURATION;
};

// Generic proxy handler for all HTTP methods
async function handleProxyRequest(
  request: NextRequest,
  method: string,
): Promise<NextResponse> {
  const { pathname, searchParams } = request.nextUrl;

  // Remove '/api/proxy' prefix to get the backend path
  const backendPath = pathname.replace("/api/proxy", "");
  const backendUrl = `${process.env.BASE_URL}/api${backendPath}${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  if (!process.env.BASE_URL) {
    return NextResponse.json(
      { message: "Server configuration error: BASE_URL is not defined" },
      { status: 500 },
    );
  }

  try {
    // Prepare headers
    const headers: Record<string, string> = {
      accept: "application/json",
    };

    // Copy content-type if present
    const contentType = request.headers.get("content-type");
    if (contentType) {
      headers["content-type"] = contentType;
    }

    // Copy authorization if present
    const authorization = request.headers.get("authorization");
    if (authorization) {
      headers["authorization"] = authorization;
    }

    // Copy cookies for authentication
    const cookie = request.headers.get("cookie");
    if (cookie) {
      headers["cookie"] = cookie;
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    // Add body for non-GET/HEAD methods
    if (method !== "GET" && method !== "HEAD") {
      const body = await request.text();
      if (body) {
        fetchOptions.body = body;
      }
    }

    // Forward request to backend
    const response = await fetch(backendUrl, fetchOptions);

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error(
        `PROXY ERROR [${method} ${backendPath}]:`,
        errorData || response.statusText,
      );

      return NextResponse.json(
        errorData || { message: `Request failed with status ${response.status}` },
        { status: response.status },
      );
    }

    // Parse response
    const data = await response.json();

    // Prepare response
    const nextResponse = NextResponse.json(data);

    // Copy response headers
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "content-encoding") {
        nextResponse.headers.set(key, value);
      }
    });

    // Set cache headers for cacheable paths
    if (isCacheable(backendPath) && method === "GET") {
      const cacheDuration = getCacheDuration(backendPath);
      nextResponse.headers.set(
        "Cache-Control",
        `public, max-age=${cacheDuration}, stale-while-revalidate=60`,
      );
    }

    return nextResponse;
  } catch (error) {
    console.error(`PROXY ROUTE ERROR [${method} ${backendPath}]:`, error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// Handle GET requests
export async function GET(request: NextRequest) {
  return handleProxyRequest(request, "GET");
}

// Handle POST requests
export async function POST(request: NextRequest) {
  return handleProxyRequest(request, "POST");
}

// Handle PUT requests
export async function PUT(request: NextRequest) {
  return handleProxyRequest(request, "PUT");
}

// Handle PATCH requests
export async function PATCH(request: NextRequest) {
  return handleProxyRequest(request, "PATCH");
}

// Handle DELETE requests
export async function DELETE(request: NextRequest) {
  return handleProxyRequest(request, "DELETE");
}

// Handle OPTIONS requests (CORS preflight)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
