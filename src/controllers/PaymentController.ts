import PaymentService from "../services/PaymentService";
import IPayload from "../intefaces/IPayload";
import IPayment from "../intefaces/IPayment";
import {Request, Response} from "express";
import {makePaymentSchema} from "../schemas/PaymentSchema";
import PaymentModel from "../models/PaymentModel";


const paymentService = new PaymentService();

export const makePayment = (req: Request, res: Response) => {
    const data = req.body as IPayment;

    const response: IPayload = {
        status: 400,
        message: "Unexpected error",
        payload: null
    };

    const { error, value } = makePaymentSchema.validate(data)

    if (error) {
        response.message = error.message;
        return res.status(200).send(response)
    }

    const payment = new PaymentModel(data);

    paymentService.createPayment(payment)
        .then(data => {
            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IPayment;

            res.send(response);
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}

export const findPaymentById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const response: IPayload = {
        status: 400,
        message: "Unexpected error",
        payload: null
    };

    if (!id) {
        response.message = "Payment id must be inputted";
        return res.status(200).send(response)
    }

    paymentService.findPayment({id} as PaymentModel)
        .then(data => {
            if (!data) {
                response.message = "No product for this id"
                return res.send(response);
            }

            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IPayment;

            res.send(response)
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}

export const findPaymentByOrder = (req: Request, res: Response) =>{
    const id = Number(req.params.id);

    const response: IPayload = {
        status: 400,
        message: "Unexpected error",
        payload: null
    };

    if (!id) {
        response.message = "Payment id must be inputted";
        return res.status(200).send(response)
    }

    paymentService.findPaymentByOrderId({fk_order_id: id} as PaymentModel)
        .then(data => {
            if (!data) {
                response.message = "No product for this id"
                return res.send(response);
            }

            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IPayment;

            res.send(response)
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}