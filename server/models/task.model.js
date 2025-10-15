const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    due_date: {type:String, required:true},
    priority_level: {type:String, required:true, enum:["high","medium","low"]},
    progress:{type:String, enum:["pending","complete"],default:"pending"},
    userID:{type:mongoose.Schema.ObjectId, ref:'User'}
},{timestamps:true});

module.exports = mongoose.model('Task',taskSchema);