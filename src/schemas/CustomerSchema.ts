import Joi from "joi";

export const newCustomerSchema = Joi.object({
    first_name: Joi.string().alphanum().required(),
    last_name: Joi.string().alphanum().required(),
    email: Joi.string().pattern(new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')).required(),
    cpf: Joi.string().pattern(new RegExp('[0-9]+$')).min(11).max(11).required(),
    password: Joi.string().required()
})

export const fullCustomerSchema = newCustomerSchema.append({
    id: Joi.number().required(),
    created_at: Joi.date().required(),
    updated_at: Joi.date()
})

export const customerLoginInfoSchema = Joi.object({
    email: Joi.string().pattern(new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')).required(),
    password: Joi.string().required()
})
