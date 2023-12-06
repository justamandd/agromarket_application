import {Request, Response} from "express";
import {CustomerModel} from "../models/CustomerModel";
import {customerLoginInfoSchema, newCustomerSchema} from "../schemas/CustomerSchema";
import IPayload from "../intefaces/IPayload";
import ICustomer from "../intefaces/ICustomer";
import CustomerService from "../services/CustomerService";
import passwordHashing from "../utils/passwordHashing";

const customerService = new CustomerService();

export const createUserProfile = (req: Request, res: Response) => {
    const data = req.body as ICustomer;

    const response: IPayload = {
        status: 400,
        message: "Unexpected error",
        payload: null
    }

    const validation = newCustomerSchema.validate(data)

    if (validation.error) {
        response.message = validation.error.message;
        return res.status(200).send(response)
    }

    data.password = passwordHashing(data.password)

    const customer: CustomerModel = new CustomerModel(data)

    customerService.createCustomer(customer)
        .then(data => {
            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as ICustomer;



            res.send(response);
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}

export const authenticateCustomer = (req: Request, res: Response) => {
    const response: IPayload = {
        status: 400,
        message: "Unexpected error",
        payload: null
    }

    const data = req.body as ICustomer

    const validation = customerLoginInfoSchema.validate(data)

    if (validation.error) {
        response.message = validation.error.message;
        return res.status(200).send(response)
    }

    data.password = passwordHashing(data.password)

    const customer: CustomerModel = new CustomerModel(data)

    customerService.authCustomer(customer)
        .then((info) => {
            if (!info) {
                response.message = "Email or password incorrect"
                return res.send(response);
            }


            if (info.password != data.password) {
                response.message = "Email or password incorrect"
                return res.send(response);
            }

            response.status = 200;
            response.message = "SUCCESS";
            response.payload = info as ICustomer;

            res.send(response);
        })
        .catch(err => {
            console.log(err)

            response.message = `${err.code}: ${err.name} on target `;

            res.send(response)
        })
}