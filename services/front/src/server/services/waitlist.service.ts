
import { waitlistNocoDBClient } from "@/lib/clients/nocoDb.client";
import { ApiResponse, errorResponse, successResponse } from "@/lib/contracts/api.contract";
import { WaitlistEntryRequest } from "@/lib/contracts/waitList/waitlistEntry.contract";
import { WaitlistRepository } from "../repositories/waitlist.repository";

export async function joinWaitlist(entry: WaitlistEntryRequest): Promise<ApiResponse> {
  try {
    const emailExists = await WaitlistRepository.doesEmailExist(entry.email);

    if (emailExists) return successResponse();

    const { data } = await waitlistNocoDBClient.post("/", entry);
    
    return successResponse(data);
  } catch (error) {
    return errorResponse("Submission failed");
  }
}
