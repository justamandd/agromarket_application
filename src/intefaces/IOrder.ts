import {order_status} from "C:/development/agromarket/node_modules/.prisma/client";

export default interface IOrder {
    id?: number,
    total_price: number,
    status?: order_status,
    created_at?: Date,
    updated_at?: Date,
    fk_customer_id: number
}