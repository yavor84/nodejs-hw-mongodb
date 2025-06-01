import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.empty': '"name" is required',
    'string.min': '"name" should be at least {#limit} characters long',
    'string.max': '"name" should be at most {#limit} characters long',
  }),
  phoneNumber: Joi.string()
    .required()
    .pattern(/^\+380\d{9}$/)
    .messages({
      'string.pattern.base':
        '"phoneNumber" must match the format +380XXXXXXXXX',
      'string.empty': '"phoneNumber" is required',
    }),
  email: Joi.string().email().messages({
    'string.email': '"email" must be a valid email address',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': '"isFavourite" must be true or false',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': '"contactType" must be one of [work, home, personal]',
      'any.required': '"contactType" is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': '"name" must be a string',
    'string.empty': '"name" cannot be empty',
    'string.min': '"name" should be at least {#limit} characters long',
    'string.max': '"name" should be at most {#limit} characters long',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .messages({
      'string.pattern.base':
        '"phoneNumber" must match the format +380XXXXXXXXX',
    }),
  email: Joi.string().email().messages({
    'string.email': '"email" must be a valid email address',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': '"isFavourite" must be true or false',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': '"contactType" must be one of [work, home, personal]',
  }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });
