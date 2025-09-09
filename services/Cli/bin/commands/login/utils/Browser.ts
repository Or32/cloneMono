

import { config } from "../../../config.js";
import open from "open";

export async function openBrowserLogin(redirectUri: string): Promise<void> {
  const url = `${config.front.cliLoginUrl}${encodeURIComponent(redirectUri)}`;

  await open(url);
  
  console.log("✅ Login page opened in your browser");
}
