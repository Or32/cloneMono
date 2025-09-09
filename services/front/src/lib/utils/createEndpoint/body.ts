import { NextRequest } from "next/server";

export async function readRequestBody(request: NextRequest): Promise<unknown> {
  const contentType = request.headers.get("content-type") ?? "";
  const method = request.method.toUpperCase();
  console.log("contentType: " , contentType)

  if (method === "GET" || method === "HEAD") return {};

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    // Convert FormData into a plain object (ignoring files here)
    const obj: Record<string, unknown> = {};
    form.forEach((value, key) => {
      if (value instanceof File) {
        obj[key] = value; // keep File object
      } else {
        obj[key] = value;
      }
    });

    return obj;
  }

  if (contentType.includes("application/json")) {
    try {
      return await request.json();
    } catch {
      return {};
    }
  }

  try {
    return await request.json();
  } catch {
    return {};
  }
}
