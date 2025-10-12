const express = require('express');
require('dotenv').config({quiet: true});

const app = express();

const userRoute = require('./routes/user.route');

app.use(express.json());

app.use('/tma/v1/user',userRoute);

module.exports = app;