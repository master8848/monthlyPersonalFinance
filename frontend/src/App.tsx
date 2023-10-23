import { useEffect, useState } from "react";
import axios from "axios";
import useCookie from "./utils/useCookies";
import { BaseURL } from "./Constants";
import MonthlyDataForm from "./MonthlyDataForm";
import { Button } from "./components/ui/button";

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
  }, [jwt]);

  return (
    <div className="mt-9">
      <Button
        onClick={() => {
          setJwt("");
        }}
      >
        Refresh Token
      </Button>
      <MonthlyDataForm />
    </div>
  );
}

export default App;
