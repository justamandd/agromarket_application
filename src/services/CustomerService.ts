import { PrismaClient } from "@prisma/client";
import CustomerModel from "../models/CustomerModel";
import ICustomer from "../intefaces/ICustomer";

export default class CustomerService {

    prisma = new PrismaClient();

    async createCustomer(customerData: CustomerModel) {
        const customer: ICustomer = await this.prisma.customer.create({
            data: {
                first_name: customerData.first_name,
                last_name: customerData.last_name,
                email: customerData.email,
                cpf: customerData.cpf,
                password: customerData.password
            }
        })

        return customer as CustomerModel
    }

    async authCustomer(customerData: CustomerModel) {
        const customer = await this.prisma.customer.findUnique({
            where: {
                email: customerData.email
            }
        })

        return customer as CustomerModel
    }

}