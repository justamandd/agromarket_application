import express from "express";
import {cancelOrder, createOrder, listOrders, listOrdersByCustomerId} from "../controllers/OrderController";

const orderRoutes = express.Router();

orderRoutes.get('/', listOrders)
orderRoutes.get('/c/:id', listOrdersByCustomerId)
orderRoutes.post('/', createOrder)
orderRoutes.delete('/:id', cancelOrder)

export default orderRoutes;