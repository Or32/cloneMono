import { authService } from "../auth/authService.js";
import { Endpoint } from "./endpoints.config.js";

const API_URL = process.env.API_URL ?? "http://localhost:3000/api";

export class ServerClient {
  private getAuthHeader(): Record<string, string> {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async request<E extends Endpoint<any, any>>(
    endpoint: E,
    body: E["req"]
  ): Promise<E["res"]> {    let fetchBody: BodyInit | undefined;
    let headers: Record<string, string> = { ...this.getAuthHeader() };

    if (endpoint.contentType === "multipart/form-data") {
      delete headers["Content-Type"];

      fetchBody = body;
    } else {
      // default JSON
      headers["Content-Type"] = "application/json";
      fetchBody = body ? JSON.stringify(body) : undefined;
    }

    const res = await fetch(`${API_URL}${endpoint.path}`, {
      method: endpoint.method,
      headers,
      body: fetchBody,
    });

    if (!res.ok) {
      throw new Error(`${endpoint.method} ${endpoint.path} failed: ${res.status}`);
    }

    return (await res.json());
  }
}

export const server = new ServerClient();
