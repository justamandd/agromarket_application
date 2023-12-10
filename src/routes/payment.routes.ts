import express from "express";
import {findPaymentById, findPaymentByOrder, makePayment} from "../controllers/PaymentController";

const paymentRoutes = express.Router();

paymentRoutes.get('/:id', findPaymentById)
paymentRoutes.get('/o/:id', findPaymentByOrder)
paymentRoutes.post('/', makePayment)

export default paymentRoutes;