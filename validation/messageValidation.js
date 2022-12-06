const Joi = require('joi');

const addMessageValidation = {
    body: Joi.object().required().keys({
        messageBody: Joi.string().min(5).max(200).required()
    }),
    params: Joi.object().required().keys({
        id: Joi.string().min(24).max(24).required()
    })
}
module.exports = {
    addMessageValidation
};