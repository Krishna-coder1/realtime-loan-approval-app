import { urlProcessor } from "@/processor/UrlProcessor";

import { Roles } from "@/enums/Roles";
import processor from "@/processor";

export class FetchLoans {
  async fetch<LoanRequestResponse>(
    role: Roles,
    processor: processor
  ): Promise<any> {
    const response = await fetch(urlProcessor(role, processor));
    return response;
  }
}
