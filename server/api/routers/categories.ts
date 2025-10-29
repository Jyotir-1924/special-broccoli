import { z } from "zod";
import { router, publicProcedure } from "../../trpc";
import { db } from "../../db";
import { categories } from "../../db/schema";
import { eq } from "drizzle-orm";


function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const categoriesRouter = router({
  
  getAll: publicProcedure.query(async () => {
    return await db.select().from(categories);
  }),

  
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const category = await db
        .select()
        .from(categories)
        .where(eq(categories.id, input.id))
        .limit(1);

      if (category.length === 0) {
        throw new Error("Category not found");
      }

      return category[0];
    }),

  
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const slug = generateSlug(input.name);

      
      const existingCategory = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, slug))
        .limit(1);

      if (existingCategory.length > 0) {
        throw new Error("A category with this name already exists");
      }

      const newCategory = await db
        .insert(categories)
        .values({
          name: input.name,
          description: input.description,
          slug,
        })
        .returning();

      return newCategory[0];
    }),

  
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;

      
      if (updateData.name) {
        const slug = generateSlug(updateData.name);
        (updateData as any).slug = slug;
      }

      const updatedCategory = await db
        .update(categories)
        .set(updateData)
        .where(eq(categories.id, id))
        .returning();

      if (updatedCategory.length === 0) {
        throw new Error("Category not found");
      }

      return updatedCategory[0];
    }),

  
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const deletedCategory = await db
        .delete(categories)
        .where(eq(categories.id, input.id))
        .returning();

      if (deletedCategory.length === 0) {
        throw new Error("Category not found");
      }

      return { success: true };
    }),
});