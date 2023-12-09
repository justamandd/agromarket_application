import express from "express";
import {cancelOrder, createOrder, listOrders, listOrdersByCustomerId} from "../controllers/OrderController";
import {addProductsToOrder} from "../controllers/ProductOrderController";

const orderRoutes = express.Router();

orderRoutes.get('/', listOrders)
orderRoutes.get('/c/:id', listOrdersByCustomerId)
orderRoutes.post('/', createOrder)
orderRoutes.delete('/:id', cancelOrder)
orderRoutes.post('/p/:id', addProductsToOrder)

export default orderRoutes;