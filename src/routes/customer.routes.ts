import express from "express";
import {authenticateCustomer, createUserProfile} from "../controllers/CustomerController";

const customerRouter = express.Router();

customerRouter.post("/", createUserProfile)
customerRouter.post("/login", authenticateCustomer)
export default customerRouter;