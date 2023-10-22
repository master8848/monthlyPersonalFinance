// import { Accounts } from "../modals/accounts";
import { Accounts } from "../modals/accounts";
import UUIDGenerator from "../utils/UUID";

export default async function monthlyAddData(req, res) {
  const addedAccount = new Accounts({
    month: new Date(),
    BankLeft: 5500,
    CashLeft: 5500,
    uuid: UUIDGenerator(),
  });
  res.send(await addedAccount.save());
}
