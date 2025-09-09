import devHandler from "./devHandler.js";


devHandler().catch((err) => {
  console.error("❌ Failed to start dev server:", err);
  process.exit(1);
});
