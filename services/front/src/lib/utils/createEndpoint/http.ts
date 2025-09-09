import { HttpError } from "@/lib/error/HttpError";
import { NextResponse } from "next/server";
import { HttpStatus } from "./type";


export function successStatusForMethod(method: string): HttpStatus {
  const m = method.toUpperCase();
  return m === "POST" || m === "PUT" || m === "PATCH" ? 201 : 200;
}

export function buildSuccessResponse<T>(data: T, status: HttpStatus) {
  return NextResponse.json(data, { status });
}

export function buildErrorResponse(error: unknown) {
  if (error instanceof HttpError) {
    return NextResponse.json({ error: error.message, details: error.details }, { status: error.status });
  }

  // eslint-disable-next-line no-console
  console.error("[API ERROR]", error);
  const message = error instanceof Error ? error.message : String(error);
  return NextResponse.json({ error: "Server error", detail: message }, { status: 500 });
}
