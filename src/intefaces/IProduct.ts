import {mass_measure} from "C:/development/agromarket/node_modules/.prisma/client";

export default interface IProduct {
    id?: number,
    name: string,
    mass_measure: mass_measure,
    total_amount: number,
    price: number,
    harvest: Date,
    created_at?: Date,
    updated_at?: Date,
    fk_farm_id: number,
}