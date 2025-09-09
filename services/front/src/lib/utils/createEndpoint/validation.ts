import { HttpError } from "@/lib/error/HttpError";
import { NextRequest } from "next/server";
import z, { ZodError, ZodType } from "zod";
import { readRequestBody } from "./body";

export function formatZodError(err: ZodError) {
  const flat = err.flatten();
  return { fieldErrors: flat.fieldErrors, formErrors: flat.formErrors };
}

export async function getValidatedBodyOrThrow<ReqSchema extends ZodType<unknown>>(
  schema: ReqSchema,
  request: NextRequest
): Promise<z.infer<ReqSchema>> {

  const body = await readRequestBody(request);
  console.log(body)

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    console.error("❌ Validation failed:", parsed.error.format());

    throw new HttpError(400, "Bad Request", formatZodError(parsed.error));
  }

  return parsed.data;
}

export function validateResponseOrThrow<ResSchema extends ZodType<unknown>>(
  schema: ResSchema,
  data: unknown
): z.infer<ResSchema> {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    throw new HttpError(500, "Invalid response contract", formatZodError(parsed.error));
  }

  return parsed.data;
}
