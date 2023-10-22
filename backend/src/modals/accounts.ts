import mongoose from "mongoose";

const AccountsSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      unique: true,
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
