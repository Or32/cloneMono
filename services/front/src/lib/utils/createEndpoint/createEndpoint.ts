import { NextRequest, NextResponse } from "next/server";
import { ZodType} from "zod";

import { buildErrorResponse, buildSuccessResponse, successStatusForMethod } from "./http";
import { getValidatedBodyOrThrow, validateResponseOrThrow } from "./validation";

import type { Context, ProtectedContext } from "@/lib/trpc/context";
import { getAuthenticatedContext } from "./authContext";
import { executeEndpointHandler } from "./handler";
import { EndpointOptions } from "./type";

export function createEndpoint<ReqSchema extends ZodType<unknown>, ResSchema extends ZodType<unknown>>(
    options: EndpointOptions<ReqSchema, ResSchema>
) {
    return async (request: NextRequest): Promise<NextResponse> => {
        try {
            const ctx: ProtectedContext | undefined = options.protected
                ? await getAuthenticatedContext(request)
                : undefined;

            const body = await getValidatedBodyOrThrow(options.requestSchema, request);

            const result = await executeEndpointHandler(options, body, ctx);

            const response = validateResponseOrThrow(options.responseSchema, result);

            const status = successStatusForMethod(request.method);

            return buildSuccessResponse(response, status);
        } catch (error) {
            return buildErrorResponse(error);
        }
    };
}
