const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser');
const createConnection = require('./DB/connection')
createConnection();
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRouter');
const messageRouter = require('./routes/messageRouter');
const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

app.use(bodyParser.json());
app.use(authRouter, userRouter, messageRouter)

app.listen(process.env.PORT, () => console.log(`Example app listening on port http://localhost:${process.env.PORT}`))