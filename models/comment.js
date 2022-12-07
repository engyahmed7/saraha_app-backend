const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentModel = new Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentModel);