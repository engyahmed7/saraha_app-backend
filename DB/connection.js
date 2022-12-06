const mongoose = require('mongoose');
const createConnection = () => {
    mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
        console.log('connected')
    }).catch((err) => {
        console.log('error in database ' + err)
    })
}
module.exports = createConnection;