import http from "http";
import { URL } from "url";
import { parseToken } from "./TokenParser.js";
import { successHtml, failureHtml } from "./HtmlTemplates.js";
import { LoginResponse } from "../../../core/fetch/contracts.js";
import { config } from "../../../config.js";

export function startLocalServer(port: number): Promise<LoginResponse | null> {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const requestUrl = new URL(req.url ?? "", config.cli.tokenFetch.baseUrl);
      const payload = requestUrl.searchParams.get("payload");

      const token = parseToken(payload);

      if (token) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(successHtml);
        server.close();
        resolve(token);
      } else {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(failureHtml);
        server.close();
        resolve(null);
      }
    });

    server.listen(port);
  });
}
