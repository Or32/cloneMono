export const config = {
  server: {
    baseUrl: "http://localhost:3000/api",
  },

  front: {
    baseUrl: "http://localhost:3000",
    get cliLoginUrl(): string {
      return `${this.baseUrl}/cliLogin?redirect=`;
    },
  },

  cli: {
    tokenFetch: { // mini server to pull token
      port: 5173,
      get baseUrl() : string {
        return `http://localhost:${this.port}`
      },
      get redirectUri(): string {
        return `${this.baseUrl}/callback`;
      },
    },
  },
};
