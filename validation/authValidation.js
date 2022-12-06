const Joi = require('joi');

const signUpValidation = {
    body: Joi.object().required().keys({
        userName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        email: Joi.string().required()
            .email({
                minDomainSegments: 2,
                tlds: {
                    allow: ['com', 'net']
                }
            }),
        password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        cpassword: Joi.string().valid(Joi.ref('password')).required(),
        phone: Joi.number,
        profilePic: Joi.string(),
        isConfirmed: Joi.boolean()
    })
}

const signInValidation = {
    body: Joi.object().required().keys({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        }).required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    })
}
module.exports = {
    signUpValidation,
    signInValidation
};