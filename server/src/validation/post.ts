 import joi from 'joi';
import mongoose from 'mongoose';

 const objectIdValidator = (value:any, helpers:joi.CustomHelpers) => {
    if(!mongoose.Types.ObjectId.isValid(value)){
        return helpers.error("any.invalid");
    }
    return value;
 } 

export const creatPostValidation = joi.object({
    title: joi.string().min(2).max(80).required(),
    content: joi.string().min(10).required(),
    creator: joi.string().custom(objectIdValidator,"objectId validation").optional(),
    tags: joi.string().custom(objectIdValidator,"objectID validation").default([]),
 });

 export const updatePostValidation = joi.object({
    title: joi.string().min(2).max(80).optional(),
    content: joi.string().min(10).optional(),
    creator: joi.string().custom(objectIdValidator,"objectId validation").optional(),
    tags: joi.string().custom(objectIdValidator,"objectID validation").default([]),
 })