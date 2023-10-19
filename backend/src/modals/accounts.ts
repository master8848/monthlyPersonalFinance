import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["uuid"])
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "uuid" })
  uuid: string;

  @Column()
  BankLeft: number;

  @Column()
  CashLeft: number;

  @Column("varchar", { length: 214748364 })
  expenses: string;
}
