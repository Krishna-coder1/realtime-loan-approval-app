import { LoanRequestData } from "../interface/LoanRequestData";
import { LoanRequester } from "../use-case/SubmitLoanRequestImplementation";

export class LoanRequestHandler implements LoanRequester {
  url: string;
  constructor(url: string) {
    this.url = url;
  }
  async submitLoanRequest<LoanRequestResponse>(
    body: LoanRequestData
  ): Promise<LoanRequestResponse> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  }
}
