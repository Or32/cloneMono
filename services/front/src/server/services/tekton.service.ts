import { tektonClient } from "@/lib/clients/tekton.client";
import { AxiosInstance } from "axios";


export interface TektonTriggerContract {
  mcpServerName: string;
  s3Url: string;
  userId: string;
  deploymentId: string;
}

export class TektonService {
  private static client: AxiosInstance = tektonClient;

  static async trigger(payload: TektonTriggerContract): Promise<unknown> {
      // const { data } = await this.client.post("/", payload);
      
      return {} // data;
  }
}
