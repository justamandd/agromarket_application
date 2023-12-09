export default interface IOrder {
    id?: number,
    total_price: number,
    created_at?: Date,
    updated_at?: Date,
    fk_customer_id: number
}