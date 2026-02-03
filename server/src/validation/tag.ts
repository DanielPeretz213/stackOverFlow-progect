import Joi from "joi";

export const addTagValidation = Joi.object({
    name: Joi.string().max(20).required()
})