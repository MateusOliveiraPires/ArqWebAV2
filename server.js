//require('dotenv').config()
const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(morgan(':method :url: :status :res[content-length] - :response-time ms'))
app.use(require('express-status-monitor')())
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = "mongodb://localhost:27017/ativ8";
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
app.use(express.json())
const postRouter = require('./routes/post')
app.use('/v1/post', postRouter)
app.listen(3000, () => console.log('Server started.'))