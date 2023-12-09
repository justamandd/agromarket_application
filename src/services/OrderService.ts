import {PrismaClient} from "@prisma/client";
import OrderModel from "../models/OrderModel";
import ProductModel from "../models/ProductModel";
import {listOrdersByCustomerId} from "../controllers/OrderController";
import ProductOrderModel from "../models/ProductOrderModel";
import IProductOrder from "../intefaces/IProductOrder";

export default class OrderService {

    prisma = new PrismaClient();

    async createOrder(orderData: OrderModel, productsIn: IProductOrder[]) {

        const order = await this.prisma.order.create({
            data: {
                total_price: orderData.total_price,
                fk_customer_id: orderData.fk_customer_id,
                products: {
                    create: productsIn.map(product => ({
                        product: {
                            connect: { id: product.product_id },
                        },
                        quantity: product.quantity,
                    })),
                },
            },
            include: {
                products: true,
            },
        });

        return order;
    }

    async deleteOrder(orderData: OrderModel) {
        const order = await this.prisma.order.delete({
            where: {
                id: orderData.id
            },
        })

        return order as unknown as OrderModel;
    }

    async listOrders() {
        const orders = await this.prisma.order.findMany({
            include: {
                products: true,
            },
        })

        return orders as unknown[] as OrderModel[];
    }

    async listOrdersByCustomerId(orderData: OrderModel) {
        const orders = await this.prisma.order.findMany({
            where: {
                fk_customer_id: orderData.fk_customer_id
            },
            include: {
                products: true,
            },
        })

        return orders as unknown as ProductModel[];
    }
}