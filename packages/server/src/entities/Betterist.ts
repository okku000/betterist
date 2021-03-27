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
import { User } from "./User";

@ObjectType()
@Entity()
export class Betterist extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index()
  evaluatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.evaluators)
  evaluator: User;

  @Column()
  @Index()
  submitterId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.submitters)
  submitter: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
