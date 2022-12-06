const router = require('express').Router();
const authController = require('../controllers/authController');
const validationFunction = require('../middleware/validationFunc');
const {
    signUpValidation,
    signInValidation
} = require('../validation/authValidation');



router.post('/signup', validationFunction(signUpValidation), authController.signup);
router.post('/signIn', validationFunction(signInValidation), authController.signIn);


module.exports = router;