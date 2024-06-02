import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

// Fetch the latest row based on the highest loan ID
export async function GET(req: NextRequest) {
  try {
    // Assuming 'LOAN_ID' is a column in the 'VENDOR_LOAN_STATUS' table
    const query =
      'SELECT * FROM "CUSTOMER_LOAN_STATUS" ORDER BY "LOAN_ID" DESC LIMIT 1;';
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "No records found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching latest loan status:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
