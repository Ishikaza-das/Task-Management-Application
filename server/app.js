require('dotenv').config({quiet: true});
const express = require('express');
const cookieParser = require('cookie-parser');
const cros = require('cors');

const app = express();
app.use(express.json());
app.use(cros({
    origin: process.env.FRONTEND,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(cookieParser());

const userRoute = require('./routes/user.route');
const taskRoute = require('./routes/tasl.route');

app.use('/tma/v1/user',userRoute);
app.use('/tma/v1/task',taskRoute);

module.exports = app;