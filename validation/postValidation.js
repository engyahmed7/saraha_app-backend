const Joi = require('joi')

const addPostValidation = {
    body: Joi.object().required().keys({
        title: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(500).required()
    }),
}
module.exports = {
    addPostValidation
};