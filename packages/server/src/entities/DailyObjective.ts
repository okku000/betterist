import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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

  @Field()
  @Column()
  user_id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.objectives)
  user: User;

  @Field(() => Objective)
  @OneToMany(() => Objective, (objective) => objective.daily_objective)
  objectives: Objective[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
