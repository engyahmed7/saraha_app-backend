const router = require('express').Router()
const messageController = require('../controllers/messageController')
const validationFunction = require('../middleware/validationFunc');
const { addMessageValidation } = require('../validation/messageValidation');

router.post('/message/:id',validationFunction(addMessageValidation), messageController.addMessage)

module.exports = router