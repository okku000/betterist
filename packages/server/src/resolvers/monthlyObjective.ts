import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getManager } from "typeorm";
import { DailyObjective } from "../entities/DailyObjective";
import { MonthlyObjective } from "../entities/MonthlyObjective";
import { Objective } from "../entities/Objective";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@Resolver(() => MonthlyObjective)
export class MonthlyObjectiveResolver {
  @Query(() => [MonthlyObjective])
  @UseMiddleware(isAuth)
  monthlyObjectivesInthisMonth(
    @Ctx() { req }: MyContext
  ): Promise<MonthlyObjective[]> {
    return MonthlyObjective.createdInThisMonth(req.session.userId);
  }

  @Mutation(() => MonthlyObjective)
  @UseMiddleware(isAuth)
  createMonthlyObjective(
    @Arg("title") title: string,
    @Ctx() { req }: MyContext
  ): Promise<MonthlyObjective> {
    return MonthlyObjective.create({
      title: title,
      userId: req.session.userId,
    }).save();
  }

  @Mutation(() => [Objective], { nullable: true })
  @UseMiddleware(isAuth)
  async createObjectives(
    @Ctx() { req }: MyContext
  ): Promise<Objective[] | undefined> {
    const { userId } = req.session;
    const objectives: Objective[] = [];
    try {
      const monthlyObjectives = await MonthlyObjective.createdInThisMonth(
        userId
      );
      if (monthlyObjectives.length === 0) {
        return;
      }
      await getManager().transaction(async (manager) => {
        const dailyObjective = DailyObjective.create({
          userId: userId,
        });
        await manager.save(dailyObjective);

        for (let index = 0; index < monthlyObjectives.length; index++) {
          const objective = Objective.create({
            title: monthlyObjectives[index].title,
            userId: userId,
            dailyObjectiveId: dailyObjective.id,
            monthlyObjectiveId: monthlyObjectives[index].id,
          });
          await manager.save(objective);
          objectives.push(objective);
        }
      });
    } catch (err) {
      throw new Error("FATAL: " + err);
    }
    return objectives;
  }
}
