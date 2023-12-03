import express, {Request, Response, NextFunction} from "express";
import {createUserProfile} from "../controllers/CustomerController";
const customerRouter = express.Router();

customerRouter.post("/register", createUserProfile)

export default customerRouter;