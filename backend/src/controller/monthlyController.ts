// import { Accounts } from "../modals/accounts";
import { Accounts } from "../modals/accounts";
import UUIDGenerator from "../utils/UUID";

export default async function monthlyAddData(req, res) {
  //   req.body;
  //   const account = new Accounts();
  //   account.uuid = UUIDGenerator();
  //   account.month = new Date();
  //   account.BankLeft = 5000;
  //   account.CashLeft = 3000;
  //   Accounts.create(account);
  //   res.send(account);
  const addedAccount = new Accounts({
    month: new Date(),
    BankLeft: 5500,
    CashLeft: 5500,
    uuid: UUIDGenerator(),
  });
  res.send(await addedAccount.save());
  // return await Accounts.add({
  //   month: new Date(),
  //   BankLeft: 5500,
  //   CashLeft: 5500,
  //   uuid: "test",
  // });

  // create({
  //   uuid: UUIDGenerator(),
  // });
}
