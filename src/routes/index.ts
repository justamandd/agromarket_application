import express from "express";
import customerRouter from "./customer.routes";
import farmRouter from "./farm.routes";
import productRouter from "./product.routes";
import orderRoutes from "./order.routes";

const routes = express.Router();

routes.use('/customer', customerRouter);
routes.use('/farm', farmRouter);
routes.use('/product', productRouter)
routes.use('/order', orderRoutes)
export default routes;