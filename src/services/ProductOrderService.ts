import ProductOrderModel from "../models/ProductOrderModel";
import {PrismaClient} from "@prisma/client";

export default class ProductOrderService {

    prisma = new PrismaClient();

    // async populateOrder(products: ProductOrderModel[], orderId: number) {
    //     const productsOrder = await this.prisma.order.createMany({
    //         data: {
    //
    //         }
    //     })
    //
    //     // const productsOrder = await this.prisma.productOrder.createMany({
    //     //     data: products.map(({product_id, quantity}) => ({
    //     //         product_id: { connect: { id: product_id } },
    //     //         order_id: { connect: { id: orderId } },
    //     //         quantity: quantity
    //     //     }))
    //     // })
    //
    //     // console.log(productsOrder)
    //
    //     return productsOrder;
    // }
}