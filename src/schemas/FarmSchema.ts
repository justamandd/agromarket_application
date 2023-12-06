import Joi from "joi";

export const createFarmSchema = Joi.object({
    name: Joi.string().required(),
    fk_customer_id: Joi.number().required()
})

export const fullFarmSchema = createFarmSchema.append({
    id: Joi.number().required(),
    created_at: Joi.date().required(),
    updated_at: Joi.date()
})