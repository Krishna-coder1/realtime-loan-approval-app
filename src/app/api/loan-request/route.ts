import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { Roles } from "@/enums/Roles";

interface LoanRequest {
  source: string;
  loanAmountReq: number;
  tenure: number;
  salary: number;
  collateralAmount: number;
  panNumber: string;
  contactNo: string;
  custId: string;
}

export async function POST(req: NextRequest) {
  const {
    source,
    loanAmountReq,
    tenure,
    salary,
    collateralAmount,
    panNumber,
    contactNo,
    custId,
  }: LoanRequest = await req.json();

  try {
    const query =
      source === Roles.VENDOR
        ? `
    INSERT INTO LOAN_REQUEST (
      SOURCE, LOAN_AMOUNT_REQ, TENURE, SALARY, 
      COLLATERAL_AMOUNT, PAN_NUMBER, CONTACT_NO
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `
        : `
      INSERT INTO LOAN_REQUEST (
        SOURCE, LOAN_AMOUNT_REQ, TENURE, SALARY, 
        COLLATERAL_AMOUNT, PAN_NUMBER, CONTACT_NO, CUST_ID
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values =
      source === Roles.VENDOR
        ? [
            source,
            loanAmountReq,
            tenure,
            salary,
            collateralAmount,
            panNumber,
            contactNo,
          ]
        : [
            source,
            loanAmountReq,
            tenure,
            salary,
            collateralAmount,
            panNumber,
            contactNo,
            custId,
          ];

    const result = await pool.query(query, values);

    return NextResponse.json(
      {
        message: "Loan request submitted successfully",
        loanRequest: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting loan request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
