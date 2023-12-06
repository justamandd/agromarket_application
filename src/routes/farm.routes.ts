import express from "express";
import {createFarmProfile, getAllFarms, getFarm} from "../controllers/FarmController";

const farmRouter = express.Router();

farmRouter.post("/create", createFarmProfile)
farmRouter.get("/", getAllFarms)
farmRouter.get("/unique", getFarm)


export default farmRouter;