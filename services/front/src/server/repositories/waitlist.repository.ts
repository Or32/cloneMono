import { waitlistNocoDBClient } from "@/lib/clients/nocoDb.client";

export class WaitlistRepository {
  static async doesEmailExist(email: string): Promise<boolean> {
    try {
      const { data } = await waitlistNocoDBClient.get("", {
        params: { where: `(email,eq,${email})` }
      });
      return data.pageInfo.totalRows > 0;
    } catch {
      throw new Error("Failed to check email existence");
    }
  }
}
