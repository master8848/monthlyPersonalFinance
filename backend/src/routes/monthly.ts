import express from "express";
import monthlyAddData from "../controller/monthlyController";

let router = express.Router();

/* GET home page. */
router.post("/", monthlyAddData);

export default router;
