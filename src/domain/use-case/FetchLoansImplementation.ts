import { Roles } from "@/enums/Roles";
import processor from "@/processor";

export interface LoanFetcher {
  fetch<T>(role: Roles, processor: processor): Promise<T>;
}
