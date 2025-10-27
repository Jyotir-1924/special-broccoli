import { NextResponse } from "next/server";

const db: { execute: (sql: string) => Promise<{ rows: any[] }> } = {
  async execute(query: string) {
    if (/SELECT\s+NOW\(\)/i.test(query)) {
      return { rows: [new Date().toISOString()] };
    }
    throw new Error("Mock db only supports SELECT NOW() in this environment");
  },
};

export async function GET() {
  try {
    const result = await db.execute(`SELECT NOW()`);
    return NextResponse.json({ serverTime: result.rows[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}