import { BetteristResolver } from "./resolvers/betterist";
import { DailyObjectiveResolver } from "./resolvers/dailyObjective";
import { HelloResolver } from "./resolvers/hello";
import { MonthlyObjectiveResolver } from "./resolvers/monthlyObjective";
import { UserResolver } from "./resolvers/user";

export const FORGET_PASSWORD_PREFIX = "forgot_password";
export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qid";

export const RESOLVERS = [
  HelloResolver,
  UserResolver,
  MonthlyObjectiveResolver,
  DailyObjectiveResolver,
  BetteristResolver,
] as const;
