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
export class MonthlyObjective extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  userId: number;

  @Field()
  @Column()
  title!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.monthlyObjectives)
  user: User;

  @Field(() => Objective)
  @OneToMany(() => Objective, (objective) => objective.monthlyObjective)
  objectives: Objective[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  static async createdInThisMonth(userId: number): Promise<MonthlyObjective[]> {
    const today = dayjs();
    return this.createQueryBuilder("monthly_objective")
      .where(`monthly_objective.createdAt BETWEEN :start AND :end `, {
        start: today.startOf("month").format("YYYY/MM/DD HH:mm:ss"),
        end: today.endOf("month").format("YYYY/MM/DD HH:mm:ss"),
      })
      .andWhere(`monthly_objective.userId = :userId`, { userId: userId })
      .getMany();
  }
}
