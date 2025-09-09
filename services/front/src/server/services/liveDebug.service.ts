import { ApiResponse, successResponse, errorResponse } from "@/lib/contracts/api.contract";
import {db, liveDebugSessionsTable} from "@/lib/db";
import {eq} from "drizzle-orm";

async function generateLiveDebugFrontendRoute() {
    // TODO - Implement
    return "Value goes here"
}

export async function saveNewLiveDebugSession(userId: string, localRoute: string) {
    return db.insert(liveDebugSessionsTable).values({
        userId,
        localRoute,
        frontendRoute: await generateLiveDebugFrontendRoute()
    })
}

export async function closeDeadTunnels() {
    return db.update(liveDebugSessionsTable)
        .set({frontendRoute: null, localRoute: null})
        .from(liveDebugSessionsTable)
        .where(eq(liveDebugSessionsTable.ttl, 0));
}

export async function isTunnelAlive(tunnelAddress: string): Promise<ApiResponse> {
    try {
        const res = await fetch(tunnelAddress);
        if (res.ok) {
            return successResponse('Tunnel is active')
        } else {
            return errorResponse('Tunnel responded with non-ok status');
        }
    } catch (err) {
        return errorResponse(`An error has occurred: ${err}`);
    }
}