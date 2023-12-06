export default interface IFarm {
    id?: number,
    name: string,
    fk_customer_id: number,
    created_at?: Date,
    updated_at?: Date,
}