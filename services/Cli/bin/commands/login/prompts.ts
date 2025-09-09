import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

export async function promptForEmail(): Promise<string> {
  const email = (await ask("📧 Enter your email address: ")).trim();

  if (!email) {
    console.error("❌ Email is required");
    process.exit(1);
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    console.error("❌ Please enter a valid email");
    process.exit(1);
  }

  return email;
}

export async function promptForToken(): Promise<string> {
  const token = (await ask("🔑 Enter the token from your email: ")).trim();
  if (!token) {
    console.error("❌ Token is required");
    process.exit(1);
  }
  rl.close();
  return token;
}
