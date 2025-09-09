import {closeDeadTunnelsCronJob} from "@/lib/cron/jobs/closeDeadTunnels";
import {CronJob} from "cron";

export const cronJobs: Map<string, CronJob> = new Map<string, CronJob>([
    ["CloseDeadTunnelsCronJob", closeDeadTunnelsCronJob]
])

export function startAllCronJobs() {
    cronJobs.forEach((job, jobName) => {
        console.log(`Starting the ${jobName} job!`);
        job.start();
    })
}