import joi from 'joi';

export const userRegisterValidation = joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email({minDomainSegments:2}).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,20}$')).required(),
});

export const userLoginValidation = joi.object({
    email: joi.string().email({minDomainSegments:2}).required(),
    password: joi.string().min(5).max(20).required(),
})
