import IFarm from "../intefaces/IFarm";

export default class FarmModel {
    id?: number
    name: string
    fk_customer_id: number
    created_at?: Date
    updated_at?: Date

    constructor({id, name, fk_customer_id, created_at, updated_at} : IFarm) {
        this.id = id;
        this.name = name;
        this.fk_customer_id = fk_customer_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}