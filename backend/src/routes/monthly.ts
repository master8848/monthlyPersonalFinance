import express from "express";
import monthlyAddData from "../controller/monthlyController";
import { isAuthenticatedUser } from "../middleware/auth";

let router = express.Router();

/* GET home page. */
router.post("/", isAuthenticatedUser, monthlyAddData);

export default router;
