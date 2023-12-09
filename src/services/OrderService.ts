import {PrismaClient} from "@prisma/client";
import OrderModel from "../models/OrderModel";
import ProductModel from "../models/ProductModel";
import {listOrdersByCustomerId} from "../controllers/OrderController";

export default class OrderService {

    prisma = new PrismaClient();

    async createOrder(orderData: OrderModel) {
        return this.prisma.order.create({
            data: {
                total_price: orderData.total_price,
                fk_customer_id: orderData.fk_customer_id,
            }
        }) as unknown as OrderModel
    }

    async deleteOrder(orderData: OrderModel) {
        const order = await this.prisma.order.delete({
            where: {
                id: orderData.id
            }
        })

        return order as unknown as OrderModel;
    }

    async listOrders() {
        const orders = await this.prisma.order.findMany()

        return orders as unknown[] as OrderModel[];
    }

    async listOrdersByCustomerId(orderData: OrderModel) {
        const orders = await this.prisma.order.findMany({
            where: {
                fk_customer_id: orderData.fk_customer_id
            }
        })

        return orders as unknown as ProductModel[];
    }
}