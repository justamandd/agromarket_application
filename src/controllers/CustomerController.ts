import {Request, Response, NextFunction} from "express";
import {CustomerModel} from "../models/CustomerModel";
import {newCustomerSchema} from "../schemas/CustomerSchema";
import IPayload from "../Intefaces/IPayload";
import ICustomer from "../Intefaces/ICustomer";
import CustomerService from "../services/CustomerService";
import crypto from 'crypto';

function gerarHashSenha(senha: string, salt: any) {
    // Cria um objeto de hash usando o algoritmo SHA-256
    const hash = crypto.createHash('sha256');

    // Adiciona a senha e o salt ao objeto de hash
    hash.update(senha + salt);

    // Gera o hash final em formato hexadecimal
    const hashSenha = hash.digest('hex');

    return hashSenha;
}


const customerService = new CustomerService();

const saltRounds = 42;

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

    data.password = gerarHashSenha(data.password, saltRounds)

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
    // console.log(validation);
}