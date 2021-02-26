import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
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
  user_id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.objectives)
  user: User;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column({ default: true })
  is_complete!: boolean;

  @Field()
  @Column()
  monthly_objective_id!: number;

  @Field(() => MonthlyObjective)
  @OneToOne(
    () => MonthlyObjective,
    (monthly_objective) => monthly_objective.objective
  )
  monthly_objective: MonthlyObjective;

  @Field()
  @Column()
  daily_objective_id!: number;

  @Field(() => DailyObjective)
  @ManyToOne(
    () => DailyObjective,
    (daily_objective) => daily_objective.objectives
  )
  daily_objective: DailyObjective;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
