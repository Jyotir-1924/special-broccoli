import { z } from "zod";
import { router, publicProcedure } from "../../trpc";
import { db } from "../../db";
import { users, posts } from "../../db/schema";
import { eq } from "drizzle-orm";

export const usersRouter = router({
  
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const user = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
          bio: users.bio,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.id, input.id))
        .limit(1);

      if (user.length === 0) {
        throw new Error("User not found");
      }

      return user[0];
    }),

  
  getPostsCount: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const userPosts = await db
        .select()
        .from(posts)
        .where(eq(posts.authorId, input.userId));

      return {
        total: userPosts.length,
        published: userPosts.filter((p) => p.published).length,
        drafts: userPosts.filter((p) => !p.published).length,
      };
    }),
});