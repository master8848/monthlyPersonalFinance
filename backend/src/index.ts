// let express = require("express");
import express from "express"; // let path = require('path');
// let cookieParser = require("cookie-parser");
import cookieParser from "cookie-parser";
// let logger = require("morgan");
import logger from "morgan";
import dotenv from "dotenv";
// let indexRouter = require("./routes/monthly");
// let usersRouter = require("./routes/users");
import indexRouter from "./routes/monthly";
import usersRouter from "./routes/users";
dotenv.config();
let app = express();
let port = normalizePort(process.env.PORT || "8080");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.get("/", (req, res) => {
//   res.send("Test");
// });
app.use("/api/v1/monthly", indexRouter);
app.use("/users", usersRouter);
app.listen(port, () => {
  console.log("listening posrt at http://localhost:" + port);
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
