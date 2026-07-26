import type {
  RequestContext,
  RequestUser
} from "./types.js";


export function createRequestContext(): RequestContext {
  return {
    user: null
  };
}


export function setRequestUser(
  context: RequestContext,
  user: RequestUser
): void {
  context.user = user;
}


export function clearRequestUser(
  context: RequestContext
): void {
  context.user = null;
}
