// src/server/router/index.ts
import superjson from "superjson";

import { createRouter } from "./context";
import { protectedExampleRouter } from "./protected-example-router";
import { script } from "./script";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("script.", script)
  .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
