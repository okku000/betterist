import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";

export const FORGET_PASSWORD_PREFIX = "forgot_password";
export const __prod__ = process.env.NODE_ENV !== "production";
export const COOKIE_NAME = "qid";

export const resolver = [HelloResolver, UserResolver] as const;
