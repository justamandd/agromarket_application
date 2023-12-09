import IOrder from "../intefaces/IOrder";

export default class OrderModel {
    id?: number
    total_price: number
    created_at?: Date
    updated_at?: Date
    fk_customer_id: number

    constructor({id, total_price, created_at, updated_at, fk_customer_id} : IOrder) {
        this.id = id;
        this.total_price = total_price;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.fk_customer_id = fk_customer_id;
    }
}