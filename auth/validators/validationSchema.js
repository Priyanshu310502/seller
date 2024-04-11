const Joi = require('joi');
const { StaticData } = require('../utils/constant.js');
const platformList = StaticData.platformList;

const mobileSchema = Joi.object().keys({
    mobile: Joi.string()
        .min(10)
        .max(10)
        .pattern(new RegExp(StaticData.mobileRegex))
        .required()
        .messages({
            'string.pattern.base': 'Invalid Mobile Format',
            'string.empty': 'Mobile number is required',
            'string.base': 'Mobile number must be a string',
            'string.length': 'Mobile number must be exactly 10 characters'
        })
});


const combinedSchema = Joi.object().keys({
    mobile: Joi.string()
        .min(10)
        .max(10)
        .pattern(new RegExp(StaticData.mobileRegex))
        .required()
        .messages({
            'string.pattern.base': 'Invalid Mobile Format',
            'string.empty': 'Mobile number is required',
            'string.base': 'Mobile number must be a string',
            'string.length': 'Mobile number must be exactly 10 characters'
        }),

    otp: Joi.string()
        .min(4)
        .max(6)
        .required()
        .messages({
            'string.base': 'OTP must be a string',
            'string.empty': 'OTP is required',
            'string.min': 'OTP must have at least {#limit} characters',
            'string.max': 'OTP cannot exceed {#limit} characters'
        }),


    fcmToken: Joi.string()
        .max(500)
        .default('')
        .label('fcmToken')
        .messages({
            'string.base': '{{#label}} must be a string',
            'string.max': '{{#label}} cannot exceed 500 characters'
        }),
    deviceName: Joi.string()
        .max(10)
        .valid(...platformList)
        .required()
        .label('Device Name')
        .messages({
            'string.base': '{{#label}} must be a string',
            'string.max': '{{#label}} cannot exceed 10 characters',
            'any.only': '{{#label}} must be one of {{#valids}}'
        })

});

const otpSchema = Joi.object().keys({
    otp: Joi.string()
        .min(4)
        .max(6)
        .required()
        .messages({
            'string.base': 'OTP must be a string',
            'string.empty': 'OTP is required',
            'string.min': 'OTP must have at least {#limit} characters',
            'string.max': 'OTP cannot exceed {#limit} characters'
        })
});








module.exports = { mobileSchema, otpSchema, combinedSchema };














// exports.schema = Joi.object().keys({
//     mobile: Joi.string().pattern(new RegExp(Comn.mobileRegex)).min(10)
//         .max(10).required().messages({
//             'string.pattern.base': 'Invalid Mobile Format',
//             'string.empty': 'Mobile number is required',
//             'string.min': 'Mobile number must be exactly 10 characters',
//             'string.max': 'Mobile number must be exactly 10 characters'
//         }),
//     otp: Joi.string().min(4).max(6).messages({
//         'string.empty': 'OTP is required',
//         'string.min': 'OTP must have at least {#limit} characters',
//         'string.max': 'OTP cannot exceed {#limit} characters'
//     })
// });