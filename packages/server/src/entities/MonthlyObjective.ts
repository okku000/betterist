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
import { Objective } from "./Objective";
import { User } from "./User";

@ObjectType()
@Entity()
export class MonthlyObjective extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  user_id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.monthly_objectives)
  user: User;

  @Field(() => Objective)
  @OneToOne(() => Objective, (objective) => objective.monthly_objective)
  objective: Objective;

  @Field()
  @Column()
  title!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
