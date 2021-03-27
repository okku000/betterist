import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DailyObjective } from "./DailyObjective";
import { MonthlyObjective } from "./MonthlyObjective";
import { User } from "./User";

@ObjectType()
@Entity()
export class Objective extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column({ default: true })
  isComplete!: boolean;

  @Index()
  @Column()
  monthlyObjectiveId!: number;

  @Field(() => MonthlyObjective)
  @ManyToOne(
    () => MonthlyObjective,
    (monthlyObjective) => monthlyObjective.objectives
  )
  monthlyObjective!: MonthlyObjective;

  @Index()
  @Column()
  userId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.objectives)
  user!: User;

  @Index()
  @Column()
  dailyObjectiveId: number;

  @Field(() => DailyObjective)
  @ManyToOne(
    () => DailyObjective,
    (dailyObjective) => dailyObjective.objectives
  )
  dailyObjective: DailyObjective;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
