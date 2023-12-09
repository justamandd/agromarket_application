import {Request, Response} from "express";
import IProductOrder from "../intefaces/IProductOrder";

export const addProductsToOrder = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const data = req.body as IProductOrder[]


}