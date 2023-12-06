import express from "express";
const routes = express.Router();

import customerRouter from "./customer.routes";
import farmRouter from "./farm.routes";

routes.use('/customer', customerRouter);
routes.use('/farm', farmRouter);

export default routes;