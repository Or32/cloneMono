import chalk from "chalk";
import { UserMeta } from "./auth/authConfig.js";

/* ----------------------------- HELPERS ----------------------------- */

function header(title: string, icon = "📢"): void {
  console.log("\n" + chalk.bold.blue(`${icon} ${title}`));
  console.log(chalk.gray("─".repeat(title.length + 4)) + "\n");
}

function success(msg: string): void {
  console.log(chalk.green(`✔ ${msg}`));
}

function warning(msg: string): void {
  console.log(chalk.yellow(`⚠ ${msg}`));
}

function error(msg: string): void {
  console.log(chalk.red(`✖ ${msg}`));
}

function info(msg: string): void {
  console.log(chalk.cyan(`ℹ ${msg}`));
}

/* ----------------------------- LOGIN ----------------------------- */

export function PrintLoginHeader(): void {
  header("Nevo Authentication", "🔐");
}

export function PrintAlreadyAuthenticated(userName: string, teamName: string): void {
  success(`Already authenticated`);
  console.log(
    `${chalk.bold("User:")} ${chalk.cyan(userName)}\n${chalk.bold("Team:")} ${chalk.blue(teamName)}`
  );
  info("Use 'nevo logout' to sign out.");
}

export function PrintLoginSuccess(metadata: UserMeta): void {
  success("Authentication successful!");
  console.log(
    `${chalk.bold("User:")} ${chalk.cyan(metadata.user.name)}\n${chalk.bold("Team:")} ${chalk.blue(metadata.activeTeam.name)}`
  );
  success("Token stored securely.");
}

/* ----------------------------- LOGOUT ----------------------------- */

export function PrintLogoutHeader(): void {
  header("Nevo Logout", "🔓");
}

export function PrintNotLoggedIn(): void {
  info("You are not currently logged in.");
}

export function PrintLogoutSuccess(): void {
  success("Successfully logged out.");
  info("Use 'nevo login' to sign in again.");
}

/* ----------------------------- DEV / HOT RELOAD ----------------------------- */

export const StartingDevServer = () => {
  header(`Starting MCP Development Server`, "🔥");
};

export const DevServerRunning = () => {
  success(`Dev server running`);
};

export const DevServerRestarting = (filename: string) => {
  warning(`Change detected in ${chalk.magenta(filename)} — restarting...`);
};

export const DashboardReady = (dashboardUrl: string) => {
  console.log(`${chalk.bold("Dashboard:")} ${chalk.underline.blue(dashboardUrl)}`);
  console.log(chalk.bold.green("\n✨ MCP server is ready for development!"));
};

