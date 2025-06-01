import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': '"name" is required',
    'string.min': '"name" should be at least {#limit} characters long',
    'string.max': '"name" should be at most {#limit} characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email address',
    'string.empty': '"email" is required',
  }),
  password: Joi.string().min(8).max(30).required().messages({
    'string.empty': '"password" is required',
    'string.min': '"password" should be at least {#limit} characters long',
    'string.max': '"password" should be at most {#limit} characters long',
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email address',
    'string.empty': '"email" is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': '"password" is required',
    'string.min': '"password" should be at least {#limit} characters long',
    'string.max': '"password" should be at most {#limit} characters long',
  }),
});
