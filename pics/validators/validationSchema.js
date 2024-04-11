const Joi = require('joi');

const picSchema = Joi.object({
    picurl: Joi.string().min(5).max(512).required(), 
    verify: Joi.boolean().required().default(false)
}).options({ abortEarly: false });

module.exports = { picSchema }