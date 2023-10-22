// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   Unique,
//   ManyToOne,
//   JoinColumn,
// } from "typeorm";
// import { Accounts } from "./accounts";
// import { Catagory } from "./catagory";

// @Entity()
// @Unique(["uuid"])
// export class Expenses {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ name: "uuid" })
//   uuid: string;

//   @Column()
//   name: string;

//   @Column()
//   ammount: number;

//   @ManyToOne(() => Catagory)
//   @JoinColumn({ name: "catagory_id", referencedColumnName: "id" })
//   catagory: Catagory;

//   @ManyToOne(() => Accounts)
//   @JoinColumn({ name: "account_id", referencedColumnName: "id" })
//   account: Accounts;
// }
