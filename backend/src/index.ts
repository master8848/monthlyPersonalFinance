import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import indexRouter from "./routes/monthly";
import usersRouter from "./routes/users";
import { ConnectToDatbase } from "./bin/database";
import ErrorHander from "./middleware/error";

dotenv.config();
let app = express();
let port = normalizePort(process.env.PORT || "8080");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/monthly", indexRouter);
app.use("/users", usersRouter);
app.use(ErrorHander);
ConnectToDatbase().then((c) => {
  app.listen(port, () => {
    console.log("listening posrt at http://localhost:" + port);
  });
});
// module.exports = app;
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipes
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
