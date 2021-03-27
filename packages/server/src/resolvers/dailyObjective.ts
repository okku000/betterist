import { Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { DailyObjective } from "../entities/DailyObjective";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@Resolver(() => DailyObjective)
export class DailyObjectiveResolver {
  @Query(() => DailyObjective)
  @UseMiddleware(isAuth)
  currentDailyObjective(
    @Ctx() { req }: MyContext
  ): Promise<DailyObjective | undefined> {
    return DailyObjective.fetchCurrent(req.session.userId);
  }

  @Query(() => DailyObjective)
  @UseMiddleware(isAuth)
  previousDailyObjective(
    @Ctx() { req }: MyContext
  ): Promise<DailyObjective | undefined> {
    return DailyObjective.fetchPrevious(req.session.userId);
  }

  @Mutation(() => DailyObjective)
  @UseMiddleware(isAuth)
  createDailyObjective(@Ctx() { req }: MyContext): Promise<DailyObjective> {
    return DailyObjective.create({
      userId: req.session.userId,
    }).save();
  }
}
