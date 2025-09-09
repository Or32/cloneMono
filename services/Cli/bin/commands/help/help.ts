export function showHelp(): void {
  console.log(`
🚀 Nevo - MCP Development CLI

Authentication:
  nevo login                  Authenticate with magic link
  nevo logout                 Sign out of your account
  nevo test                   Test authentication status

Usage:
  nevo create <project-name>  Create a new MCP server project
  nevo dev                    Start development server
  nevo deploy                 Deploy project for production
  nevo --help                 Show this help message
  nevo --version              Show version

Examples:
  nevo login
  nevo test
  nevo create my-mcp-server
  nevo dev
  nevo deploy
  nevo logout

Note: Authentication is required for create, dev, and deploy commands.
`);
}
