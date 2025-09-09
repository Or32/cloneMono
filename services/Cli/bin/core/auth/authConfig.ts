import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";

const CONFIG_DIR = join(homedir(), ".yourcli");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

export interface UserMeta {
  activeTeam: {
    id: string;
    name: string;
    createdAt: string; 
  };
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string;
  };
}

export interface CLIAuthConfig {
  token?: string;    
  meta?: UserMeta;    
}

export class AuthConfig {
  private ensureConfigDir(): void {
    if (!existsSync(CONFIG_DIR)) {
      mkdirSync(CONFIG_DIR, { recursive: true });
    }
  }

  private read(): CLIAuthConfig {
    try {
      if (!existsSync(CONFIG_FILE)) return {};
      return JSON.parse(readFileSync(CONFIG_FILE, "utf8"));
    } catch {
      return {};
    }
  }

  private write(config: CLIAuthConfig): void {
    this.ensureConfigDir();
    writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  }

  getToken(): string | null {
    return this.read().token ?? null;
  }

  getMeta(): UserMeta | null {
    return this.read().meta ?? null;
  }

  setAuth(token: string, meta: UserMeta): void {
    this.write({ token, meta });
  }

  clear(): void {
    this.write({});
  }
}

export const authConfig = new AuthConfig();
