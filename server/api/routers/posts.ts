import { z } from "zod";
import { router, publicProcedure } from "../../trpc";
import { db } from "../../db";
import { posts, postsToCategories } from "../../db/schema";
import { eq, desc } from "drizzle-orm";

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const postsRouter = router({
  // Get all posts
  getAll: publicProcedure
    .input(
      z.object({
        published: z.boolean().optional(),
        categoryId: z.number().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      let query = db.select().from(posts).orderBy(desc(posts.createdAt));
      
      if (input?.published !== undefined) {
        query = query.where(eq(posts.published, input.published)) as any;
      }

      const allPosts = await query;

      // If categoryId filter is provided
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

  // Get post by ID
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

      // Get categories for this post
      const postCategories = await db
        .select()
        .from(postsToCategories)
        .where(eq(postsToCategories.postId, input.id));

      return {
        ...post[0],
        categoryIds: postCategories.map((pc) => pc.categoryId),
      };
    }),

  // Get post by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await db
        .select()
        .from(posts)
        .where(eq(posts.slug, input.slug))
        .limit(1);

      if (post.length === 0) {
        throw new Error("Post not found");
      }

      // Get categories for this post
      const postCategories = await db
        .select()
        .from(postsToCategories)
        .where(eq(postsToCategories.postId, post[0].id));

      return {
        ...post[0],
        categoryIds: postCategories.map((pc) => pc.categoryId),
      };
    }),

  // Create post
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        content: z.string().min(1, "Content is required"),
        published: z.boolean().default(false),
        categoryIds: z.array(z.number()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const slug = generateSlug(input.title);

      // Check if slug already exists
      const existingPost = await db
        .select()
        .from(posts)
        .where(eq(posts.slug, slug))
        .limit(1);

      if (existingPost.length > 0) {
        throw new Error("A post with this title already exists");
      }

      // Create post
      const newPost = await db
        .insert(posts)
        .values({
          title: input.title,
          content: input.content,
          slug,
          published: input.published,
          updatedAt: new Date(),
        })
        .returning();

      // Add categories if provided
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

  // Update post
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        published: z.boolean().optional(),
        categoryIds: z.array(z.number()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, categoryIds, ...updateData } = input;

      // Generate new slug if title is being updated
      if (updateData.title) {
        const slug = generateSlug(updateData.title);
        (updateData as any).slug = slug;
      }

      // Update post
      const updatedPost = await db
        .update(posts)
        .set({ ...updateData, updatedAt: new Date() })
        .where(eq(posts.id, id))
        .returning();

      if (updatedPost.length === 0) {
        throw new Error("Post not found");
      }

      // Update categories if provided
      if (categoryIds !== undefined) {
        // Remove existing categories
        await db
          .delete(postsToCategories)
          .where(eq(postsToCategories.postId, id));

        // Add new categories
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

  // Delete post
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const deletedPost = await db
        .delete(posts)
        .where(eq(posts.id, input.id))
        .returning();

      if (deletedPost.length === 0) {
        throw new Error("Post not found");
      }

      return { success: true };
    }),
});