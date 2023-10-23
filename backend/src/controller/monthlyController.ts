// import { Accounts } from "../modals/accounts";
import mongoose from "mongoose";
import { Accounts } from "../modals/accounts";
import moment from "moment";
import { Users } from "../modals/user";
import UUIDGenerator from "../utils/UUID";

export default async function monthlyAddData(req, res) {
  req.body.user = req.user._id.toString();
  req.body.BankLeft = +req.body.BankLeft;
  req.body.CashLeft = +req.body.CashLeft;
  req.body.Investment = +req.body.Investment;
  req.body.uuid = UUIDGenerator();
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
  if (!account) account = await (await new Accounts(req.body)).save();
  res.send(account);
  // res.send({});
}
