// let express = require("express");
import express from "express"; // let path = require('path');
// let cookieParser = require("cookie-parser");
import cookieParser from "cookie-parser";
// let logger = require("morgan");
import logger from "morgan";
// let indexRouter = require("./routes/monthly");
// let usersRouter = require("./routes/users");
import indexRouter from "./routes/monthly";
import usersRouter from "./routes/users";
let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/v1/monthly", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
