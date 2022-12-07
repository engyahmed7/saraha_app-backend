const router = require('express').Router();
const userController = require('../controllers/userController');
const endPoints = require('../endPoints/user.endPoint');
const {
    auth
} = require('../middleware/auth');
const validationFunction = require('../middleware/validationFunc');
const {
    multerFn,
    validationType
} = require('../service/multer');
const {
    addCommentValidation
} = require('../validation/commentValidation');
const {
    addPostValidation
} = require('../validation/postValidation');
const {
    updateUserValidation
} = require('../validation/userValidation');

router.patch('/updateUser', auth(endPoints.updateUser), validationFunction(updateUserValidation), userController.updateUser)
router.get('/allMessages', auth(endPoints.getMessages), userController.getAllMessages)
router.patch('/user/profilePic', auth(endPoints.updateUser), multerFn('user/profilePictures', validationType.image).single('image'), userController.updateProfilePicture)
router.patch('/user/profileCoverPics', auth(endPoints.updateUser), multerFn('user/coverPictures', validationType.image).array('images', 5), userController.updateCoverPicture)
router.patch('/user/uploadFile', auth(endPoints.updateUser), multerFn('user/pdf', validationType.files).single('pdf'), userController.updateFilePdf)

router.post('/user/post', auth(endPoints.updateUser), validationFunction(addPostValidation), userController.AddPost)
router.post('/user/post/:id/comment', auth(endPoints.updateUser), validationFunction(addCommentValidation), userController.AddComment)

router.get('/user/allPosts', userController.getAllPosts)

module.exports = router;