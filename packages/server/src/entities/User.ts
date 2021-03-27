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
import { Betterist } from "./Betterist";
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
  firstName: string;

  @Field()
  @Column({ nullable: true })
  lastName: string;

  @Column()
  @MinLength(8)
  password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  // relateions----
  @OneToMany(
    () => MonthlyObjective,
    (monthlyObjective) => monthlyObjective.user
  )
  monthlyObjectives: MonthlyObjective[];

  @OneToMany(() => DailyObjective, (dailyObjective) => dailyObjective.user)
  daily_objectives: DailyObjective[];

  @OneToMany(() => Objective, (objective) => objective.user)
  objectives: Objective[];

  @OneToMany(() => Betterist, (betterist) => betterist.evaluator)
  evaluators: Betterist[];

  @OneToMany(() => Betterist, (betterist) => betterist.submitter)
  submitters: Betterist[];
}
