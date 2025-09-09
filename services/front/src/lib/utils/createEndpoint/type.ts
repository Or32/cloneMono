import { ProtectedContext } from "@/lib/trpc/context";
import z from "zod";

export type HttpStatus = number;

export type BaseOptions<ReqSchema, ResSchema> = {
    requestSchema: ReqSchema;
    responseSchema: ResSchema;
};

export type PublicHandler<Req, Res> = {
    protected: false;
    handler: (req: Req) => Promise<Res> | Res;
};

export type ProtectedHandler<Req, Res> = {
    protected: true;
    handler: (req: Req, ctx: ProtectedContext) => Promise<Res> | Res;
};

export type EndpointOptions<
    ReqSchema,
    ResSchema
> = BaseOptions<ReqSchema, ResSchema> & (PublicHandler<z.infer<ReqSchema>, z.infer<ResSchema>> |
    ProtectedHandler<z.infer<ReqSchema>, z.infer<ResSchema>>);
