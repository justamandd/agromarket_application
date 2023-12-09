import CustomerModel from "../models/CustomerModel";
import * as jwt from "jsonwebtoken";
import {Secret} from "jsonwebtoken";
import {Response} from "express";

export default class Jwt {

    customerData: CustomerModel

    constructor(customerData: CustomerModel) {
        this.customerData = customerData
    }

    static verifyJwtToken(jwtToken: string) {
        try {
            jwt.verify(jwtToken, process.env.JWT_SECRET as Secret)
            return true;
        } catch (e) {
            return false;
        }

    }

    setJwtToken(res: Response) {
        res.cookie("token", jwt.sign(this.customerData, process.env.JWT_SECRET as Secret), {
            httpOnly: true,
        })
    }


}