import IPayment from "../intefaces/IPayment";

export default class PaymentModel{
    id?: number
    value: number
    created_at?: Date
    fk_customer_id: number
    fk_order_id: number

    constructor({id, value, created_at, fk_customer_id, fk_order_id}: IPayment) {
        this.id = id;
        this.value = value;
        this.created_at = created_at;
        this.fk_customer_id = fk_customer_id;
        this.fk_order_id = fk_order_id;
    }
}