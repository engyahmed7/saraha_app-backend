const User = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const {
        userName,
        email,
        password,
        cpassword
    } = req.body;

    const FoundedUser = await User.findOne({
        email
    })
    if (FoundedUser) {
        res.json({
            message: 'user already exist'
        })
    } else {
        if (password != cpassword) {
            res.json({
                message: "passwords doesn't match"
            })
        } else {
            const user = new User({
                userName,
                email,
                password
            })
            const saveUser = await user.save();
            if (saveUser) {
                res.json({
                    message: "welcome",
                    saveUser
                })
            } else {
                res.json({
                    message: "error"
                })
            }
        }
    }
};

exports.signIn = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const FoundedUser = await User.findOne({
        email
    })
    if (!FoundedUser) {
        res.json({
            message: "user is not exist"
        })
    } else {
        bcrypt.compare(password, FoundedUser.password, function (err, result) {
            if (result) {
                var token = jwt.sign({
                    id: FoundedUser._id,
                    email: email,
                    role: FoundedUser.role,
                    isLogin: true
                }, process.env.KEY_JWT);
                console.log(token);
                res.json({
                    message: "login success",
                    token
                })
            } else {
                res.json({
                    message: "your password is not correct "
                })
            }
        })
    }
};