const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const saltRounds = 10;

const userModel = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: Number,
    profilePic: String,
    coverPics: Array,
    role: {
        type: String,
        default: 'user'
    },
    lastSeen: String,
    isConfirmed: {
        type: Boolean,
        default: false
    },
    pdf: String,
}, {
    timestamps: true
});

userModel.pre('save', async function (next) {
    this.password = bcrypt.hashSync(this.password, parseInt(process.env.saltRounds));
    next();
})

const updatedHooks = ['findOneAndUpdate', 'findOneAndDelete', 'findOneAndRemove', 'findOneAndReplace'];
updatedHooks.forEach((key) => {
    userModel.pre(key, async function () {
        let data = await this.model.findOne(this.getQuery());
        // console.log(data);
        this.set({
            __v: data.__v + 1
        })
    })
})

module.exports = mongoose.model('User', userModel);