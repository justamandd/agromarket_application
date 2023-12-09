import IProductOrder from "../intefaces/IProductOrder";

export default class ProductOrderModel {
    product_id: number
    order_id?: number
    quantity: number

    constructor({ product_id, order_id, quantity}: IProductOrder) {
        this.product_id = product_id;
        this.order_id = order_id;
        this.quantity = quantity;
    }
}