// let express = require("express");
import express from "express"; // let path = require('path');
// let cookieParser = require("cookie-parser");
// import cookieParser from "cookie-parser";
// let logger = require("morgan");
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
// let indexRouter = require("./routes/monthly");
// let usersRouter = require("./routes/users");
import indexRouter from "./routes/monthly";
import usersRouter from "./routes/users";
import { ConnectToDatbase } from "./bin/database";
dotenv.config();
let app = express();
let port = normalizePort(process.env.PORT || "8080");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser());

// sequelize
//   .authenticate()
//   .then((c) => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => console.error("Unable to connect to the database:", error));

// app.use(express.static(path.join(__dirname, 'public')));
// app.get("/", (req, res) => {
//   res.send("Test");
// });
app.use("/api/v1/monthly", indexRouter);
app.use("/users", usersRouter);
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
