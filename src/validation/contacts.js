import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    phoneNumber: Joi.number().integer().required().messages({
        'string.base': 'Phone number should be a number',
        'any.required': 'Phone number is required',
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
    }),
    parentId: Joi.string().required(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    phoneNumber: Joi.number().integer(),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal'),
});
