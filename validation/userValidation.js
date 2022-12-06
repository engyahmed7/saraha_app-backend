const Joi = require('joi');

const updateUserValidation = {
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
        profilePic: Joi.string()
    })
}
module.exports = {
    updateUserValidation
};