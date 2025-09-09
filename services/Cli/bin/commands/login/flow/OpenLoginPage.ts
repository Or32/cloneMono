import { startLocalServer } from "../utils/LocalServer.js";
import { openBrowserLogin } from "../utils/Browser.js";
import { LoginResponse } from "../../../core/fetch/contracts.js";
import { config } from "../../../config.js";

export async function OpenLoginPage(): Promise<LoginResponse | null> {
  console.log("🌐 Starting login flow...");

  // Start local server that will resolve once callback hits
  const serverPromise = startLocalServer(config.cli.tokenFetch.port);

  // Open browser pointing to your auth server
  await openBrowserLogin(config.cli.tokenFetch.redirectUri);

  // Wait for server to resolve with token (or null)
  return await serverPromise;
}
