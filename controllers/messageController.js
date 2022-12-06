const Message = require('../models/message');
const User = require('../models/user')


exports.addMessage = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            messageBody
        } = req.body;

        const user = await User.findById(id);
        if (user) {
            const message = await Message.insertMany({
                messageBody,
                receiverId: id
            })
            res.json({
                mess: "message added",
                message
            })
        } else {
            res.json({
                message: "User is not exist"
            })
        }
    } catch (error) {
        res.json({
            message: "catch error",
            err: error
        })
    }
};