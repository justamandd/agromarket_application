import express from "express";
import {createFarmProfile, getAllFarms, getFarm, getFarmByCustomer} from "../controllers/FarmController";

const farmRouter = express.Router();

farmRouter.post("/", createFarmProfile)
farmRouter.get("/", getAllFarms)
farmRouter.get("/:id", getFarm)
farmRouter.get("/c/:id", getFarmByCustomer)



export default farmRouter;