const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageModel = new Schema({
    messageBody: {
        type: String,
        required: true
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageModel);