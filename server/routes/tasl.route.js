const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/authenticated');
const {createTask, getUserTask, editTask, deleteTask} = require('../controller/task.controller');

router.post('/create_task',isAuthenticated, createTask);
router.get('/getTask',isAuthenticated, getUserTask);
router.put('/update-task/:id',isAuthenticated,editTask);
router.delete('/delete-task/:id',isAuthenticated,deleteTask);

module.exports = router;