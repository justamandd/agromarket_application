import {PrismaClient} from "@prisma/client";
import FarmModel from "../models/FarmModel";
import IFarm from "../intefaces/IFarm";

export default class FarmService {
    prisma = new PrismaClient();

    async createFarm(farmData: FarmModel) {
        const farm: IFarm = await this.prisma.farm.create({
            data: {
                name: farmData.name, fk_customer_id: farmData.fk_customer_id
            }
        })

        return farm as FarmModel;
    }

    async listFarms() {
        const farms: IFarm[] = await this.prisma.farm.findMany();

        return farms as FarmModel[];
    }

    async getFarm(farmData: FarmModel) {
        const farm = await this.prisma.farm.findUnique({
            where: {
                id: farmData.id
            }
        })

        return farm as FarmModel;
    }

    async getFarmByCustomer(farmData: FarmModel) {
        const farm = await this.prisma.farm.findUnique({
            where: {
                fk_customer_id: farmData.fk_customer_id
            }
        })

        return farm as FarmModel;
    }
}