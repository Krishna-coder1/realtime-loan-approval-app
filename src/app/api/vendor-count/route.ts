import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

// Fetch total count of rows
export async function GET(req: NextRequest) {
  try {
    const query = 'SELECT COUNT(*) FROM "VENDOR_LOAN_STATUS";';
    const result = await pool.query(query);
    const count = result.rows[0].count;

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching count of loan statuses:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
