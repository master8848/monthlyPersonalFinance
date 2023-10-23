import { Input } from "./components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./components/ui/button";
import axios from "axios";
import { BaseURL } from "./Constants";
import useCookie from "./utils/useCookies";
import { Label } from "./components/ui/label";
// {
//   "month":"Mon, 23 Oct 2023 09:32:00 GMT",
//   "BankLeft":12,
//   "CashLeft":10,
//   "Investment":180

const MonthlyDataForm = () => {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();
  const [jwt] = useCookie("jwt", "");
  const onSubmit: SubmitHandler<any> = async (val) => {
    val.month = new Date().toUTCString();
    console.log(val);
    const { data } = await axios.post(BaseURL + "/api/v1/monthly", val, {
      headers: { authorization: "Bearer " + jwt },
    });
    console.log(data);
  };
  return (
    <div className="w-screen flex  justify-center align-middle">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mt-9 max-w-5xl "
      >
        <Label htmlFor="form_BankLeft"> Ammount in bank</Label>
        <Input
          {...register("BankLeft")}
          id="form_BankLeft"
          placeholder="Ammount in bank"
        ></Input>
        <Label htmlFor="form_CashLeft"> Ammount in cash aviable</Label>
        <Input
          {...register("CashLeft")}
          id="form_CashLeft"
          placeholder="Ammount in cash aviable"
        ></Input>
        <Label htmlFor="form_Investment">Total ammount in inveatment</Label>
        <Input
          {...register("Investment")}
          id="form_Investment"
          placeholder="Total ammount in inveatment"
        ></Input>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default MonthlyDataForm;
