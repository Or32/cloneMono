import { HotReloadServer } from "./utils/hotRealod.js";

const DEFAULT_PORT = 3000;

export default async function devHandler() {    
    new HotReloadServer(DEFAULT_PORT).start();
}

