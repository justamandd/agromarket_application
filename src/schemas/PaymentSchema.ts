import Joi from "joi";

export const makePaymentSchema = Joi.object({
    value: Joi.number().required(),
    fk_customer_id: Joi.number().required(),
    fk_order_id: Joi.number().required()
})