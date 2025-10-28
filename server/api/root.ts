import { router } from "../trpc";
import { postsRouter } from "./routers/posts";
import { categoriesRouter } from "./routers/categories";
import { usersRouter } from "./routers/users";

export const appRouter = router({
  posts: postsRouter,
  categories: categoriesRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;