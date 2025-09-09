import Anthropic from "@anthropic-ai/sdk";
import "dotenv/config"; // this is loaded before main


export const anthropicClient = new Anthropic({
    apiKey: process.env.ANTROPICS_API_KEY,
});
