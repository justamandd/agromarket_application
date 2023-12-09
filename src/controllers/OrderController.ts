import {Request, Response} from "express";
import IOrder from "../intefaces/IOrder";
import IPayload from "../intefaces/IPayload";
import {createOrderSchema} from "../schemas/OrderSchema";
import OrderModel from "../models/OrderModel";
import OrderService from "../services/OrderService";

const orderService = new OrderService();

export const createOrder = (req: Request, res: Response) => {
    const data = req.body as IOrder;

    const response: IPayload = {
        status: 400,
        message: "Unexpected error",
        payload: null
    }

    const { error, value } = createOrderSchema.validate(data);

    if (error) {
        response.message = error.message;
        return res.status(200).send(response)
    }

    const order = new OrderModel(data)

    orderService.createOrder(order)
        .then(data => {
            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IOrder;

            res.send(response);
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}

export const cancelOrder = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const response: IPayload = {
        status: 400,
        message: "Unexpected error",
        payload: null
    };

    if (!id) {
        response.message = "Order id must be inputted";
        return res.status(200).send(response)
    }

    orderService.deleteOrder(new OrderModel({id} as IOrder))
        .then(data => {
            if (!data) {
                response.message = "No product for this id"
                return res.send(response);
            }

            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IOrder;

            res.send(response)
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}

export const listOrders = (req: Request, res: Response) => {
    const response: IPayload = {
        status: 400,
        message: "Unexpected error",
        payload: null
    }

    orderService.listOrders()
        .then(data => {
            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IOrder[];

            res.send(response);
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}
export const listOrdersByCustomerId = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const response: IPayload = {
        status: 400,
        message: "Unexpected error",
        payload: null
    };

    if (!id) {
        response.message = "Customer id must be inputted";
        return res.status(200).send(response)
    }

    orderService.listOrdersByCustomerId(new OrderModel({fk_customer_id: id} as IOrder))
        .then(data => {
            if (!data) {
                response.message = "No product for this id"
                return res.send(response);
            }

            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as unknown as IOrder[];

            res.send(response)
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })

}


