import {Request, Response} from "express";
import CustomerModel from "../models/CustomerModel";
import {customerLoginInfoSchema, newCustomerSchema} from "../schemas/CustomerSchema";
import IPayload from "../intefaces/IPayload";
import ICustomer from "../intefaces/ICustomer";
import CustomerService from "../services/CustomerService";
import passwordHashing from "../utils/passwordHashing";
import Jwt from "../utils/jwt";
import IProduct from "../intefaces/IProduct";

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

            new Jwt(info).setJwtToken(res)

            response.status = 200;
            response.message = "SUCCESS";
            response.payload = {
                id: info.id
            };

            res.send(response);
        })
        .catch(err => {
            console.log(err)

            response.message = `${err.code}: ${err.name} on target `;

            res.send(response)
        })
}

export const getCustomerById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const { token } = req.body;

    const response: IPayload = {
        status: 400,
        message: "Unexpected error",
        payload: null
    };

    if (!id) {
        response.message = "Customer Id must be inputted";
        return res.status(200).send(response)
    }

    if (!token) {
        response.message = "Token must be inputted";
        return res.status(200).send(response)
    }

    if (Jwt.verifyJwtToken(token)) {
        customerService.getCustomerById(new CustomerModel({id} as ICustomer))
            .then(data => {
                if (!data) {
                    response.message = "No product for this id"
                    return res.send(response);
                }

                response.status = 200;
                response.message = "SUCCESS";
                response.payload = data as ICustomer;

                res.send(response)
            })
            .catch(err => {
                response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

                res.status(200).send(response)
            })
    }

}