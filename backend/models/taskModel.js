const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type:String,
        maxlength:30,
        required:true
    },
    description:{
        type:String,
        minlength:10,
        maxlength:200
    },
    status:{
        type:String,
        enum:['pending','in-progress','done'],
        default:'in-progress'
    },
    deadline:{
        type:Date,
        required:true
    }
},{
    timestamps:true
})

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;