import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";

export const t = initTRPC.context<Context>().create({
  transformer: superjson,

    errorFormatter({ shape, error }) {
    // Keep the default shape, but log details
    console.error("❌ tRPC error:", {
      code: error.code,
      message: error.message,
      cause: error.cause,
      stack: error.cause instanceof Error ? error.cause.stack : undefined,
    });

    return shape;
  },
});

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;


export const isAuthed = middleware(({ ctx, next}) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  });
});


export const protectedProcedure = t.procedure.use(isAuthed);