const express = require('express');
const { register, login, updateUser, logout, getUser } = require('../controller/user.controller');
const isAuthenticated = require('../middleware/authenticated');
const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/me',isAuthenticated,getUser);
router.put('/update-profile',isAuthenticated,updateUser);
router.get('/logout',logout);

module.exports = router;