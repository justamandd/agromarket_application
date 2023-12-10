import {PrismaClient} from "@prisma/client";
import IPayment from "../intefaces/IPayment";
import PaymentModel from "../models/PaymentModel";

export default class PaymentService{
    prisma = new PrismaClient();

    async createPayment(paymentData: IPayment) {
        return this.prisma.payment.create({
            data: {
                value: paymentData.value,
                fk_customer_id: paymentData.fk_customer_id,
                fk_order_id: paymentData.fk_order_id
            },
        }) as unknown as PaymentModel
    }

    async findPayment(paymentData: IPayment) {
        return this.prisma.payment.findUnique({
            where: {
                id: paymentData.id
            }
        }) as unknown as PaymentModel
    }

    async findPaymentByOrderId(paymentData: IPayment) {
        return this.prisma.payment.findUnique({
            where: {
                fk_order_id: paymentData.fk_order_id
            }
        }) as unknown as PaymentModel
    }
}