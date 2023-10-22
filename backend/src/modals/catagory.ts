// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   Unique,
//   ManyToOne,
//   JoinColumn,
//   OneToMany,
// } from "typeorm";
// import { Accounts } from "./accounts";
// import { Expenses } from "./expenses";

// @Entity()
// @Unique(["uuid"])
// export class Catagory {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ name: "uuid" })
//   uuid: string;

//   @Column()
//   name: string;

//   @OneToMany(() => Expenses, (articleEntity) => articleEntity.account)
//   @JoinColumn()
//   account: Expenses;
// }
import mongoose from "mongoose";

const CatagorySchema = new mongoose.Schema(
  {
    uuid: { type: String },

    name: { type: String },

    //   @OneToMany(() => Expenses, (articleEntity) => articleEntity.account)
    //   @JoinColumn()
    //   account: Expenses;
  },
  {
    timestamps: true,
  }
);
export default CatagorySchema;
export const Catagory = mongoose.model("Accounts", CatagorySchema);
