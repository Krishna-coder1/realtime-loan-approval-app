import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

// Fetch loan statuses
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const loanRequestId = searchParams.get("loanRequestId");

  try {
    if (loanRequestId) {
      // Fetch loan status by loan request ID
      const query =
        'SELECT * FROM "VENDOR_LOAN_STATUS" WHERE loanRequestId = $1;';
      const values = [loanRequestId];
      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return NextResponse.json(
          { message: "Loan Request ID not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(result.rows[0], { status: 200 });
    } else {
      // Fetch all loan statuses
      const query = 'SELECT * FROM "VENDOR_LOAN_STATUS";';
      const result = await pool.query(query);

      return NextResponse.json(result.rows, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching loan statuses:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
