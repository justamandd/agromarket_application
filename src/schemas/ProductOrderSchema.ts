import Joi from "joi";

export const createProductOrderSchema = Joi.array().items({
    product_id: Joi.number().required(),
    quantity: Joi.number().required(),
})

export const searchProductOrderSchema = Joi.array().items({
    product_id: Joi.number().required()
})