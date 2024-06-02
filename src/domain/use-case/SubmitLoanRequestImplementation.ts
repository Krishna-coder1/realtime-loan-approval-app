import { LoanRequestData } from "../interface/LoanRequestData";
import { LoanRequestResponse } from "../responses/LoanRequestResponse";

export interface LoanRequester {
  submitLoanRequest(body: LoanRequestData): Promise<LoanRequestResponse>;
}
