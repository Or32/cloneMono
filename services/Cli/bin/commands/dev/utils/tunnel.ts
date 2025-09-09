import { ChildProcess, spawn } from "child_process";
import open from "open";
import { DashboardReady } from "../../../core/messages.js";

const LOCAL_DASHBOARD = "http://localhost:3000";

export interface TunnelInfo {
  process: ChildProcess;
  publicUrl: string | null;
  dashboardUrl: string | null;
}

export function startTunnel(port: number): TunnelInfo {
  const loadingInterval = showLoadingSpinner();

  const tunnelProcess = spawn("cloudflared", ["tunnel", "--url", `http://localhost:${port}`], {
    stdio: "pipe",
  });

  const info: TunnelInfo = {
    process: tunnelProcess,
    publicUrl: null,
    dashboardUrl: null,
  };

  tunnelProcess.stderr.on("data", (data) => {
    const text = data.toString();
    const tunnelUrl = extractTunnelUrl(text);

    if (tunnelUrl && !info.publicUrl) {
      clearInterval(loadingInterval);
      process.stdout.write("\r");

      info.publicUrl = tunnelUrl;
      info.dashboardUrl = buildDashboardUrl(tunnelUrl);

      DashboardReady(info.dashboardUrl);

      open(info.dashboardUrl).catch((err) => {
        console.warn("⚠️ Failed to open browser automatically:", err.message);
      });
    }
  });

  tunnelProcess.on("error", () => {
    clearInterval(loadingInterval);
    process.stdout.write("\r");
  });

  tunnelProcess.on("exit", (code) => {
    if (code !== 0 && !info.publicUrl) {
      clearInterval(loadingInterval);
      process.stdout.write("\r");
    }
  });

  tunnelProcess.on("disconnect", () => {
  });

  return info;
}

function showLoadingSpinner(): NodeJS.Timeout {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;
  return setInterval(() => {
    process.stdout.write(`\r${frames[i]}`);
    i = (i + 1) % frames.length;
  }, 100);
}

function extractTunnelUrl(text: string): string | null {
  const regex = /https:\/\/[a-z0-9-]+\.trycloudflare\.com/;
  return text.match(regex)?.[0] ?? null;
}

function buildDashboardUrl(tunnelUrl: string): string {
  // Append /mcp so inspector or UI can directly call your MCP endpoint
  return `${LOCAL_DASHBOARD}?mcpServerUrl=${tunnelUrl}/mcp`;
}
