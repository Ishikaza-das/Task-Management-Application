require('dotenv').config({quiet: true});
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true,
}))
app.use(cookieParser());

const userRoute = require('./routes/user.route');
const taskRoute = require('./routes/tasl.route');

app.use('/tma/v1/user',userRoute);
app.use('/tma/v1/task',taskRoute);

module.exports = app;