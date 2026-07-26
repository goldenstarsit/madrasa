import type {
  Middleware,
  RequestContext
} from "./types.js";


export const authMiddleware: Middleware =
  async (
    context: RequestContext,
    next
  ): Promise<void> => {

    if (!context.user) {
      throw new Error(
        "Authentication required"
      );
    }

    await next();
  };
