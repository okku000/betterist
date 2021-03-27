import dayjs from "dayjs";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Objective } from "./Objective";
import { User } from "./User";

@ObjectType()
@Entity()
export class DailyObjective extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  userId: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.objectives)
  user!: User;

  @Field(() => [Objective])
  @OneToMany(() => Objective, (objective) => objective.dailyObjective)
  objectives: Objective[];

  static fetchCurrent(userId: number): Promise<DailyObjective | undefined> {
    const today = dayjs().format("YYYY-MM-DD");
    const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
    return this.createQueryBuilder("daily_objective")
      .leftJoinAndSelect("daily_objective.objectives", "objective")
      .where("daily_objective.userId = :userId", { userId })
      .andWhere("daily_objective.createdAt > :today", { today })
      .andWhere("daily_objective.createdAt < :tomorrow", { tomorrow })
      .getOne();
  }

  static fetchPrevious(userId: number): Promise<DailyObjective | undefined> {
    const today = dayjs().format("YYYY-MM-DD");
    return this.createQueryBuilder("daily_objective")
      .leftJoinAndSelect("daily_objective.objectives", "objective")
      .where("daily_objective.userId = :userId", { userId })
      .andWhere("daily_objective.createdAt < :today", { today })
      .getOne();
  }
}
