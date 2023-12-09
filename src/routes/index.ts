import express from "express";
const routes = express.Router();

import customerRouter from "./customer.routes";
import farmRouter from "./farm.routes";
import productRouter from "./product.routes";
import orderRoutes from "./order.routes";

routes.use('/customer', customerRouter);
routes.use('/farm', farmRouter);
routes.use('/product', productRouter)
routes.use('/order', orderRoutes)
export default routes;