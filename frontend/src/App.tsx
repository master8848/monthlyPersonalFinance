import { useEffect } from "react";
import axios from "axios";
import useCookie from "./utils/useCookies";
import { BaseURL } from "./Constants";
import MonthlyDataForm from "./MonthlyDataForm";

function App() {
  const [jwt, setJwt] = useCookie("jwt", "");
  useEffect(() => {
    if (!jwt) {
      (async () => {
        const { data } = await axios.post(BaseURL + "/users/login", {
          email: "saursanjelgg@gmail.com",
          password: "saursanjelgg@gmail.com",
        });
        setJwt(data.token);
      })();
    }
  }, []);

  return (
    <>
      <MonthlyDataForm />
    </>
  );
}

export default App;
