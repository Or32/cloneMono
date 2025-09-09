import { createMcpClient } from "@/lib/clients/mcp.client";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const chatRouter = router({
  sendMessage: publicProcedure
    .input(
      z.object({
        mcpUrl: z.string().url(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
    //   const mcp = await createMcpClient(input.mcpUrl);
    //   const response = await mcp.request("chat.send", { text: input.message });

    //   return { reply: response?.text ?? "No response" };
    }),
});
