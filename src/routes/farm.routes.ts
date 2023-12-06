import express from "express";
import {createFarmProfile} from "../controllers/FarmController";

const farmRouter = express.Router();

farmRouter.post("/create", createFarmProfile)


export default farmRouter;