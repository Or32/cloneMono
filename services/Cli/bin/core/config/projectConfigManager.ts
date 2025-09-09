import fs from "fs";
import path from "path";

export type ProjectConfig = {
  contxtHub: {
    projectName: string;
    nextVersion: string;
    projectId: string;
    team: string;
  };
  development: {
    port: number;
    entryPoint: string;
  };
  production: {
    port: number;
    entryPoint: string;
  };
};

const getContextFile = () => path.resolve(process.cwd(), "contxtHub.json");

export class ProjectConfigManager {

  private static readFile(): ProjectConfig {
    if (!fs.existsSync(getContextFile())) {
      throw new Error("❌ contxtHub.json not found in project root");
    }

    const raw = fs.readFileSync(getContextFile(), "utf-8");
    return JSON.parse(raw) as ProjectConfig;
  }

  private static writeFile(data: ProjectConfig): void {
    fs.writeFileSync(getContextFile(), JSON.stringify(data, null, 2));
  }

  /** ✅ Get the entire project config */
  static get(): ProjectConfig {
    return this.readFile();
  }

  /** ✅ Update fields under contxtHub */
  static update(fields: Partial<ProjectConfig["contxtHub"]>): void {
    const context = this.readFile();
    context.contxtHub = { ...context.contxtHub, ...fields };
    this.writeFile(context);
  }

  /* ---------- Versioning ---------- */

  static bumpPatch(): void {
    const context = this.readFile();
    const [major, minor, patch] = context.contxtHub.nextVersion.split(".").map(Number);
    context.contxtHub.nextVersion = [major, minor, patch + 1].join(".");
    this.writeFile(context);
  }

  static bumpMinor(): void {
    const context = this.readFile();
    const [major, minor] = context.contxtHub.nextVersion.split(".").map(Number);
    context.contxtHub.nextVersion = [major, minor + 1, 0].join(".");
    this.writeFile(context);
  }

  static bumpMajor(): void {
    const context = this.readFile();
    const [major] = context.contxtHub.nextVersion.split(".").map(Number);
    context.contxtHub.nextVersion = [major + 1, 0, 0].join(".");
    this.writeFile(context);
  }

  /* ---------- Metadata ---------- */

  static setProjectId(hash: string): void {
    this.update({ projectId: hash });
  }

  static setTeam(team: string): void {
    this.update({ team });
  }

  /* ---------- Environment-like Access ---------- */

  /** ✅ Get development port, throw if invalid */
  static getDevPort(): number {
    const port = this.readFile().development.port;
    if (!port || isNaN(port)) {
      throw new Error("❌ Invalid development port in contxtHub.json");
    }
    return port;
  }

  /** ✅ Get production port */
  static getProdPort(): number {
    const port = this.readFile().production.port;
    if (!port || isNaN(port)) {
      throw new Error("❌ Invalid production port in contxtHub.json");
    }
    return port;
  }

  /** ✅ Get dev entrypoint */
  static getDevEntry(): string {
    const entry = this.readFile().development.entryPoint;
    if (!entry) {
      throw new Error("❌ Development entryPoint missing in contxtHub.json");
    }
    return entry;
  }

  /** ✅ Get prod entrypoint */
  static getProdEntry(): string {
    const entry = this.readFile().production.entryPoint;
    if (!entry) {
      throw new Error("❌ Production entryPoint missing in contxtHub.json");
    }
    return entry;
  }

  static getNextVersion = (): string => {
    const version = this.readFile().contxtHub.nextVersion;
    ProjectConfigManager.bumpPatch();

    return version

  }
}
