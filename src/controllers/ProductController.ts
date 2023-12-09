import {Request, Response} from "express";
import IProduct from "../intefaces/IProduct";
import IPayload from "../intefaces/IPayload";
import {createProductSchema, fullProductSchema, idProductSchema} from "../schemas/ProductSchema";
import ProductModel from "../models/ProductModel";
import ProductService from "../services/ProductService";

const productService = new ProductService();

export const createProduct = (req: Request, res: Response) => {
    const data = req.body as IProduct

    const response: IPayload = {
        status: 400, message: "Unexpected error", payload: null
    }

    const {error, value} = createProductSchema.validate(data);

    if (error) {
        response.message = error.message;
        return res.status(200).send(response)
    }

    const product = new ProductModel(data);

    productService.createProduct(product)
        .then(data => {
            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IProduct;

            res.send(response);
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}

export const updateProduct = (req: Request, res: Response) => {
    const data = req.body as IProduct

    const response: IPayload = {
        status: 400, message: "Unexpected error", payload: null
    }

    const {error, value} = fullProductSchema.validate(data);

    if (error) {
        response.message = error.message;
        return res.status(200).send(response)
    }

    const product = new ProductModel(data);

    productService.updateProduct(product)
        .then(data => {
            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IProduct;

            res.send(response);
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}

export const getAllProducts = (req: Request, res: Response) => {
    const response: IPayload = {
        status: 400, message: "Unexpected error", payload: null
    }

    productService.listProducts()
        .then(data => {
            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IProduct[];

            res.send(response);
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}

export const findProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const response: IPayload = {
        status: 400, message: "Unexpected error", payload: null
    };

    if (!id) {
        response.message = "Product Id must be inputted";
        return res.status(200).send(response)
    }

    productService.getProduct(new ProductModel({id} as IProduct))
        .then(data => {
            if (!data) {
                response.message = "No product for this id"
                return res.send(response);
            }

            response.status = 200;
            response.message = "SUCCESS";
            response.payload = data as IProduct;

            res.send(response)
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}

export const deleteProduct = (req: Request, res: Response) => {
    const data = req.body as IProduct;

    const response: IPayload = {
        status: 400, message: "Unexpected error", payload: null
    };

    const {error, value} = idProductSchema.validate(data)

    if (error) {
        response.message = error.message;
        return res.status(200).send(response)
    }

    productService.deleteProduct(data as ProductModel)
        .then(data => {
            if (!data) {
                response.message = "No product for this id"
                return res.send(response);
            }

            response.status = 200;
            response.message = "SUCCESS DELETION";
            response.payload = data as IProduct;

            res.send(response)
        })
        .catch(err => {
            response.message = `${err.code}: ${err.name} on target ${err.meta.target}`;

            res.status(200).send(response)
        })
}

