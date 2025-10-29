import { z } from "zod";
import { router, publicProcedure } from "../../trpc";
import { db } from "../../db";
import { posts, postsToCategories, users } from "../../db/schema";
import { eq, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";


function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const postsRouter = router({
  
  getAll: publicProcedure
    .input(
      z
        .object({
          published: z.boolean().optional(),
          categoryId: z.number().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      let query = db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          slug: posts.slug,
          published: posts.published,
          authorId: posts.authorId,
          createdAt: posts.createdAt,
          updatedAt: posts.updatedAt,
          author: {
            id: users.id,
            name: users.name,
            email: users.email,
            image: users.image,
          },
        })
        .from(posts)
        .leftJoin(users, eq(posts.authorId, users.id))
        .orderBy(desc(posts.createdAt));

      if (input?.published !== undefined) {
        query = query.where(eq(posts.published, input.published)) as any;
      }

      const allPosts = await query;

      
      if (input?.categoryId) {
        const postCategories = await db
          .select()
          .from(postsToCategories)
          .where(eq(postsToCategories.categoryId, input.categoryId));

        const postIds = postCategories.map((pc) => pc.postId);
        return allPosts.filter((post) => postIds.includes(post.id));
      }

      return allPosts;
    }),

  
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const post = await db
        .select()
        .from(posts)
        .where(eq(posts.id, input.id))
        .limit(1);

      if (post.length === 0) {
        throw new Error("Post not found");
      }

      
      const postCategories = await db
        .select()
        .from(postsToCategories)
        .where(eq(postsToCategories.postId, input.id));

      return {
        ...post[0],
        categoryIds: postCategories.map((pc) => pc.categoryId),
      };
    }),

  
  getBySlug: publicProcedure
  .input(z.object({ slug: z.string() }))
  .query(async ({ input }) => {
    const post = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        slug: posts.slug,
        published: posts.published,
        authorId: posts.authorId,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        author: {
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
        },
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .where(eq(posts.slug, input.slug))
      .limit(1);

    if (post.length === 0) {
      throw new Error("Post not found");
    }

    
    const postCategories = await db
      .select()
      .from(postsToCategories)
      .where(eq(postsToCategories.postId, post[0].id));

    return {
      ...post[0],
      categoryIds: postCategories.map((pc) => pc.categoryId),
    };
  }),

  
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        content: z.string().min(1, "Content is required"),
        published: z.boolean().default(false),
        categoryIds: z.array(z.number()).optional(),
        authorId: z.string().optional(), 
      })
    )
    .mutation(async ({ input }) => {
      const slug = generateSlug(input.title);

      
      const existingPost = await db
        .select()
        .from(posts)
        .where(eq(posts.slug, slug))
        .limit(1);

      if (existingPost.length > 0) {
        throw new Error("A post with this title already exists");
      }

      
      const newPost = await db
        .insert(posts)
        .values({
          title: input.title,
          content: input.content,
          slug,
          published: input.published,
          authorId: input.authorId, 
          updatedAt: new Date(),
        })
        .returning();

      
      if (input.categoryIds && input.categoryIds.length > 0) {
        await db.insert(postsToCategories).values(
          input.categoryIds.map((categoryId) => ({
            postId: newPost[0].id,
            categoryId,
          }))
        );
      }

      return newPost[0];
    }),

  
  update: publicProcedure
  .input(
    z.object({
      id: z.number(),
      title: z.string().min(1).optional(),
      content: z.string().min(1).optional(),
      published: z.boolean().optional(),
      categoryIds: z.array(z.number()).optional(),
      userId: z.string(), 
    })
  )
  .mutation(async ({ input }) => {
    const { id, categoryIds, userId, ...updateData } = input;

    
    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);

    if (existingPost.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post not found",
      });
    }

    
    if (existingPost[0].authorId !== userId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You don't have permission to edit this post",
      });
    }

    
    if (updateData.title) {
      const slug = generateSlug(updateData.title);
      (updateData as any).slug = slug;
    }

    
    const updatedPost = await db
      .update(posts)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();

    
    if (categoryIds !== undefined) {
      
      await db
        .delete(postsToCategories)
        .where(eq(postsToCategories.postId, id));

      
      if (categoryIds.length > 0) {
        await db.insert(postsToCategories).values(
          categoryIds.map((categoryId) => ({
            postId: id,
            categoryId,
          }))
        );
      }
    }

    return updatedPost[0];
  }),

  
delete: publicProcedure
  .input(
    z.object({
      id: z.number(),
      userId: z.string(), 
    })
  )
  .mutation(async ({ input }) => {
    
    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.id, input.id))
      .limit(1);

    if (existingPost.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post not found",
      });
    }

    
    if (existingPost[0].authorId !== input.userId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You don't have permission to delete this post",
      });
    }

    const deletedPost = await db
      .delete(posts)
      .where(eq(posts.id, input.id))
      .returning();

    return { success: true };
  }),
});