import Joi from "joi";

export const createOrderSchema = Joi.object({
    total_price: Joi.number().required(),
    fk_customer_id: Joi.number().required()
})

export const fullOrderSchema = createOrderSchema.append({
    id: Joi.number().required(),
    created_at: Joi.date(),
    updated_at: Joi.date()
})