import { MinLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DailyObjective } from "./DailyObjective";
import { MonthlyObjective } from "./MonthlyObjective";
import { Objective } from "./Objective";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @MinLength(3)
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ nullable: true })
  firstname: string;

  @Field()
  @Column({ nullable: true })
  lastname: string;

  @Column()
  @MinLength(8)
  password!: string;

  @OneToMany(
    () => MonthlyObjective,
    (monthly_objective) => monthly_objective.user
  )
  monthly_objectives: MonthlyObjective[];

  @Field(() => DailyObjective)
  @OneToMany(() => DailyObjective, (daily_objective) => daily_objective.user)
  daily_objectives: DailyObjective[];

  @OneToMany(() => Objective, (objective) => objective.user)
  objectives: Objective[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
