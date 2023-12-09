import {PrismaClient} from "@prisma/client";
import ProductModel from "../models/ProductModel";
import IProduct from "../intefaces/IProduct";

export default class ProductService {

    prisma = new PrismaClient();

    async createProduct(productData: ProductModel) {
        const product = await this.prisma.product.create({
            data: {
                name: productData.name,
                mass_measure: productData.mass_measure,
                total_amount: productData.total_amount,
                price: productData.price,
                harvest: productData.harvest,
                fk_farm_id: productData.fk_farm_id
            }
        })

        return product as unknown as ProductModel;
    }

    async updateProduct(productData: ProductModel) {
        const product = await this.prisma.product.update({
            where: {
                id: productData.id,
            },
            data: {
                name: productData.name,
                mass_measure: productData.mass_measure,
                total_amount: productData.total_amount,
                price: productData.price,
                harvest: productData.harvest,
                updated_at: new Date(),
            }
        })

        return product as unknown as ProductModel;
    }

    async listProducts() {
        const product = await this.prisma.product.findMany()

        return product as unknown[] as ProductModel[];
    }

    async getProduct(productData: ProductModel) {
        const product = await this.prisma.product.findUnique({
            where: {
                id: productData.id
            }
        })

        return product as unknown as ProductModel;
    }

    async deleteProduct(productData: ProductModel) {
        const product = await this.prisma.product.delete({
            where: {
                id: productData.id
            }
        })

        return product as unknown as ProductModel;
    }

    async getMultipleProducts(productData: ProductModel[]) {
        const ids: number[] = productData.map(product => product.id!)

        const products = await this.prisma.product.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        return products
    }
}