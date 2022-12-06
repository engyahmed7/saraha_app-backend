const {
    access
} = require("../middleware/auth");

const endPoints = {
    updateUser: [access.Admin, access.User],
    getMessages: [access.Admin, access.User]
};

module.exports = endPoints;