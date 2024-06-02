export interface LoanRequestEntity {
  LOAN_ID: number;
  SOURCE: string;
  LOAN_AMOUNT_REQ: number;
  TENURE: number;
  SALARY: number;
  COLLATERAL_AMOUNT: number;
  PAN_NUMBER: string;
  CONTACT_NO: string;
  CREDIT_SCORE: number;
  ELIGIBLE_AMOUNT: number;
  TOTAL_LOAN_AMOUNT: number | null;
  LOAN_STATUS: string;
}
