import express from "express";
import {createFarmProfile, getAllFarms, getFarm} from "../controllers/FarmController";

const farmRouter = express.Router();

farmRouter.post("/", createFarmProfile)
farmRouter.get("/", getAllFarms)
farmRouter.get("/:id", getFarm)


export default farmRouter;