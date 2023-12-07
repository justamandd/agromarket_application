import { mass_measure } from "C:/development/agromarket/node_modules/.prisma/client";
import IProduct from "../intefaces/IProduct";

export default class ProductModel {
    id?: number
    name: string
    mass_measure: mass_measure
    total_amount: number
    price: number
    harvest: Date
    created_at?: Date
    updated_at?: Date
    fk_farm_id: number

    constructor({ id, name, mass_measure, total_amount, price, harvest, created_at, updated_at, fk_farm_id }: IProduct) {
        this.id = id;
        this.name = name;
        this.mass_measure = mass_measure;
        this.total_amount = Number(total_amount);
        this.price = Number(price);
        this.harvest = harvest;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.fk_farm_id = fk_farm_id;
    }
}