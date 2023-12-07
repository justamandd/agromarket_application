import express from "express";
const routes = express.Router();

import customerRouter from "./customer.routes";
import farmRouter from "./farm.routes";
import productRouter from "./product.routes";

routes.use('/customer', customerRouter);
routes.use('/farm', farmRouter);
routes.use('/product', productRouter)

export default routes;