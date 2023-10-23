// import { Accounts } from "../modals/accounts";
import mongoose from "mongoose";
import { Accounts } from "../modals/accounts";
import moment from "moment";
import { Users } from "../modals/user";

export default async function monthlyAddData(req, res) {
  req.body.user = req.user._id.toString();
  await Users.findByIdAndUpdate(req.body.user, {
    bank: req.body.BankLeft,
    cash: req.body.CashLeft,
    investment: req.body.Investment,
  });

  let account = await Accounts.findOneAndUpdate(
    {
      month: {
        $gte: moment(req.body.month).startOf("month").toDate(),
        $lte: moment(req.body.month).endOf("month").toDate(),
      },
      user: new mongoose.Types.ObjectId(req.body.user),
    },
    req.body,
    { new: true }
  );
  if (!account) account = await new Accounts(req.body);
  res.send(account.save?.());
  // res.send({});
}
