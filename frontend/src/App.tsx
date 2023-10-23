import { useEffect, useState } from "react";
import axios from "axios";
import useCookie from "./utils/useCookies";
import { BaseURL } from "./Constants";
import MonthlyDataForm from "./MonthlyDataForm";
import { Button } from "./components/ui/button";

function App() {
  const [jwt, setJwt] = useCookie("jwt", "");
  const [tokenRefetch, setTokenRefetch] = useState(1);
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
  }, [tokenRefetch]);

  return (
    <div className="mt-9">
      <Button onClick={() => setTokenRefetch((c) => ++c)}>Refresh Token</Button>
      <MonthlyDataForm />
    </div>
  );
}

export default App;
