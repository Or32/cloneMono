import { initializePaths } from "./utils/paths.js";
import { CleanDist } from "./flow/CleanDist.js";
import { CompileSources } from "./flow/CompileSources.js";

import { Cleanup } from "./flow/Cleanup.js";
import { CopyEntrypoints } from "./flow/CopyEntrypoints.js";
import { ProcessCompiled } from "./flow/ProcessCompiled.js";
import { SetPermissions } from "./flow/SetPermissions.js";
import { UploadPackage } from "./flow/UploadPackage.js";
import { CreatePackageZip } from "./flow/CreatePackageZip.js";

export class DeployHandler {
  private paths = initializePaths();

  async deploy(): Promise<void> {
    console.log("🔨 Building project...");

    await CleanDist(this.paths);
    await CompileSources(this.paths);
    // ProcessCompiled(this.paths);
    // await CopyEntrypoints(this.paths);
    // SetPermissions(this.paths);
    await CreatePackageZip(this.paths);
    await UploadPackage(this.paths);
    await Cleanup(this.paths);

    console.log("✅ Build and deploy complete!");
  }
}
