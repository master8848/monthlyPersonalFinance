import mongoose from "mongoose";
import UUIDGenerator from "../utils/UUID";

const AccountsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    uuid: {
      type: String,
      unique: true,
      default: UUIDGenerator,
    },
    month: {
      type: Date,
    },

    BankLeft: {
      type: Number,
    },

    CashLeft: {
      type: Number,
    },
    Investment: {
      type: Number,
    },

    //   @OneToMany(() => Expenses, (articleEntity) => articleEntity.account)
    //   @JoinColumn()
    //   expenses: Expenses;
  },
  {
    timestamps: true,
  }
);
export default AccountsSchema;
export const Accounts = mongoose.model("Accounts", AccountsSchema);
