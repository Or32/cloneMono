import z, { ZodType} from "zod";
import { EndpointOptions, ProtectedHandler, PublicHandler } from "./type";
import { Context } from "@/lib/trpc/context";

type ReqOf<S extends ZodType<any>> = z.infer<S>;
type ResOf<S extends ZodType<any>> = z.infer<S>;

export async function executeEndpointHandler<
    ReqSchema extends ZodType<any>,
    ResSchema extends ZodType<any>
>(
    options: EndpointOptions<ReqSchema, ResSchema>,
    input: ReqOf<ReqSchema>,
    ctx?: Context
): Promise<ResOf<ResSchema>> {

    if (options.protected) {
        const handler = options as ProtectedHandler<ReqOf<ReqSchema>, ResOf<ResSchema>>;

        return handler.handler(input, ctx!);
    }

    const handler = options as PublicHandler<ReqOf<ReqSchema>, ResOf<ResSchema>>;

    return handler.handler(input);
}
