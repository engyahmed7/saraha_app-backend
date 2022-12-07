const Message = require("../models/message");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

exports.updateUser = async (req, res) => {
    const {
        userName,
        email
    } = req.body;
    const id = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(id, {
        userName,
        email
    }, {
        // 3alashan yrg3 el haga el updated fy postman 3alatol
        new: true
    });
    if (updatedUser) {
        res.json({
            message: "User updated sucessfully !!",
            updatedUser
        })
    } else {
        res.json({
            message: "something wrong"
        })
    }
};

exports.getAllMessages = async (req, res) => {

    try {
        const id = req.user._id;
        // console.log(req.user._id)
        const user = await User.findById(id);
        if (user) {
            const messages = await Message.find({
                receiverId: id
            }).select('messageBody')

            if (messages) {
                res.json({
                    message: "Your Messages",
                    messages
                })
            } else {
                res.json({
                    message: "no messages found"
                })
            }
        } else {
            res.json({
                message: "user not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "catch error",
            err: error
        })
    }
};

exports.updateProfilePicture = async (req, res) => {
    if (req.fileUploadError) {
        res.status(422).json({
            message: 'invalid file'
        })
    } else {
        let fileName = `${req.protocol}//${req.headers.host}/${req.destination}/${req.file.filename}`;
        const updated = await User.findByIdAndUpdate(req.user._id, {
            profilePic: fileName
        }, {
            new: true
        })
        res.json({
            message: "uploaded",
            updated
        })
    }
};

exports.updateCoverPicture = async (req, res) => {
    if (req.fileUploadError) {
        res.status(422).json({
            message: 'invalid file'
        })
    } else {
        let uploadedImages = []
        for (let i = 0; i < req.files.length; i++) {
            let fileName = `${req.protocol}//${req.headers.host}/${req.destination}/${req.files[i].filename}`;
            uploadedImages.push(fileName);
        }
        const updated = await User.findByIdAndUpdate(req.user._id, {
            coverPics: uploadedImages
        }, {
            new: true
        })
        res.json({
            message: "uploaded",
            updated
        })
    }
};

exports.updateFilePdf = async (req, res) => {
    if (req.fileUploadError) {
        res.status(422).json({
            message: 'invalid file'
        })
    } else {
        let fileName = `${req.protocol}//${req.headers.host}/${req.destination}/${req.file.filename}`;
        const updated = await User.findByIdAndUpdate(req.user._id, {
            pdf: fileName
        }, {
            new: true
        })
        res.json({
            message: "uploaded",
            updated
        })
    }
};

exports.AddPost = async (req, res) => {
    let {
        title,
        description
    } = req.body;
    let id = req.user._id;

    let addedPost = await Post.insertMany({
        title,
        description,
        userId: id
    })

    if (addedPost) {
        res.json({
            message: "added",
            addedPost
        })
    } else {
        res.json({
            message: "sorry, can't add your post"
        })
    }
};

exports.AddComment = async (req, res) => {
    let {
        title
    } = req.body;
    let postId = req.params.id;

    const addedComment = await Comment.insertMany({
        title,
        userId: req.user._id
    })

    console.log(addedComment[0]._id)

    const addCommentToPost = await Post.findOneAndUpdate({
        _id: postId
    }, {
        $push: {
            commentsIds: addedComment[0]._id
        }
    }, {
        new: true
    })

    res.json({
        message: "Done",
        addCommentToPost
    })
};

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find({}).populate('commentsIds').populate('userId')
    res.json({
        message: "all posts",
        posts
    })
};