import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, bio } = await req.json();

    const updatedUser = await db
      .update(users)
      .set({
        name: name || undefined,
        bio: bio || undefined,
      })
      .where(eq(users.id, session.user.id))
      .returning();

    return NextResponse.json({ user: updatedUser[0] }, { status: 200 });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}