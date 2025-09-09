import {closeDeadTunnels} from "@/services/liveDebugService";
import { CronJob } from 'cron';

const ONCE_AN_HOUR = "0 * * * *"

export const closeDeadTunnelsCronJob = new CronJob(
    ONCE_AN_HOUR,
    async () => {await closeDeadTunnels()}
);

