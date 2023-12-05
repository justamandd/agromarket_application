import express from "express";
const routes = express.Router();

import customerRouter from "./customer.routes";

routes.use('/customer', customerRouter);

export default routes;