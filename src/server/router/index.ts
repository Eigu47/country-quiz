// src/server/router/index.ts
import superjson from "superjson";

import { createRouter } from "./context";
import { countries } from "./countries";
import { protectedExampleRouter } from "./protected-example-router";
import { script } from "./script";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", protectedExampleRouter)
  .merge("script.", script)
  .merge("countries.", countries);

// export type definition of API
export type AppRouter = typeof appRouter;
