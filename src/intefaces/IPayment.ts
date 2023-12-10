export default interface IPayment {
    id?: number,
    value: number,
    created_at?: Date,
    fk_customer_id: number,
    fk_order_id: number
}