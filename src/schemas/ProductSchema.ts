import Joi from "joi";

export const createProductSchema = Joi.object({
    name: Joi.string().required(),
    mass_measure: Joi.string().valid("kg", "ton", "bag").required(),
    total_amount: Joi.number().required(),
    price: Joi.number().required(),
    harvest: Joi.date().required(),
    fk_farm_id: Joi.number().required(),
})

export const fullProductSchema = createProductSchema.append({
    id: Joi.number().required(),
    created_at: Joi.date(),
    updated_at: Joi.date()
})

export const idProductSchema = Joi.object({
    id: Joi.number().required()
})