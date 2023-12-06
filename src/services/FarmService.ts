import {PrismaClient} from "@prisma/client";
import {FarmModel} from "../models/FarmModel";
import IFarm from "../intefaces/IFarm";

export default class FarmService {
    prisma = new PrismaClient();

    async createFarm(farmData: FarmModel) {
        const farm: IFarm = await this.prisma.farm.create({
            data: {
                name: farmData.name,
                fk_customer_id: farmData.fk_customer_id
            }
        })

        return farm as FarmModel;
    }
}