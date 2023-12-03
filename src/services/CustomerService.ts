import { PrismaClient } from "@prisma/client";
import {CustomerModel} from "../models/CustomerModel";
import ICustomer from "../Intefaces/ICustomer";

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




    // async createCustomer(customerInfo: CustomerModel): Promise<CustomerModel> {
    //     const customer = await this.prisma.customer.create({
    //         data: {
    //             first_name: customerInfo.first_name.toString(),
    //             last_name: customerInfo.last_name.toString(),
    //             email: customerInfo.email.toString(),
    //             password: customerInfo.password.toString()
    //         }
    //     })
    //
    // //     return new CustomerModel(customer)
    // // }







    updateCustomer(customerInfo: CustomerModel): Promise<CustomerModel> {
        throw new Error("Method not implemented.");
    }
    findCustomer(id: BigInt): Promise<CustomerModel>;
    findCustomer(email: String): Promise<CustomerModel>;
    findCustomer(email: unknown): Promise<CustomerModel> {
        throw new Error("Method not implemented.");
    }
    listCustomers(): Promise<CustomerModel>[] {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: BigInt): boolean {
        throw new Error("Method not implemented.");
    }

}