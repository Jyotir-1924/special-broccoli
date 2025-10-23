// src/app/api/test-db/route.ts (if using App Router)
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET() {
  try {
    const result = await db.execute(`SELECT NOW()`);
    return NextResponse.json({ serverTime: result.rows[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}