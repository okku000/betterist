import { Betterist } from "../entities/Betterist";
import {
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";

@Resolver(() => Betterist)
export class BetteristResolver {
  @FieldResolver()
  evaluator(@Root() betterist: Betterist) {
    return User.findOne(betterist.evaluatorId);
  }
  @FieldResolver()
  submitter(@Root() betterist: Betterist) {
    return User.findOne(betterist.submitterId);
  }

  @Mutation(() => Betterist)
  @UseMiddleware(isAuth)
  async createBetterist(@Ctx() { req }: MyContext): Promise<Betterist | null> {
    let randUser: User | undefined;
    do {
      randUser = await getConnection()
        .getRepository(User)
        .createQueryBuilder()
        .orderBy("RAND()")
        .getOne();
    } while (randUser?.id == req.session.userId);

    return Betterist.create({
      submitterId: req.session.userId,
      evaluatorId: randUser?.id,
    }).save();
  }
}
