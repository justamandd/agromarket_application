import {Request, Response, NextFunction} from "express";
import {CustomerModel} from "../models/CustomerModel";
import {newCustomerSchema} from "../schemas/CustomerSchema";
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
        return res.status(400).send(response)
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
            response.message = err.message;

            res.status(400).send(response)
        })
}