const express = require('express');
require('dotenv').config({quiet: true});

const app = express();

app.use(express.json());

module.exports = app;