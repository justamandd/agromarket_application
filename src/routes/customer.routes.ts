import express from "express";
import {authenticateCustomer, createUserProfile, getCustomerById} from "../controllers/CustomerController";

const customerRouter = express.Router();

customerRouter.get("/:id", getCustomerById)
customerRouter.post("/", createUserProfile)
customerRouter.post("/login", authenticateCustomer)
export default customerRouter;