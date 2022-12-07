const Joi = require('joi')

const addCommentValidation = {
    body: Joi.object().required().keys({
        title: Joi.string().min(5).max(20).required()
    }),
    params: Joi.object().required().keys({
        id: Joi.string().min(24).max(24).required()
    })
}
module.exports = {
    addCommentValidation
};