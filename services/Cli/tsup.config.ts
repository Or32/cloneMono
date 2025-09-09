import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],     // your CLI entry
  format: ["esm", "cjs"],
  target: "node18",
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  bundle: true,
  noExternal: ["@contxthub/contracts"], // ✅ only bundle this package
});
