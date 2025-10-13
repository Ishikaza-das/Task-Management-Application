require('dotenv').config({quiet: true});
const express = require('express');
const cookieParser = require('cookie-parser');
const cros = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());

const userRoute = require('./routes/user.route');


app.use('/tma/v1/user',userRoute);

module.exports = app;