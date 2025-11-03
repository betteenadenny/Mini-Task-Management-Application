const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const {validateSignup,validateLogin,validateTask} = require('../middleware/validate');
const authenticate = require('../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET ;

router.post('/auth/signup',validateSignup, async(req,res) => {
  try {
    const {name,email,password} = req.body;
    
    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(400).json({message:'Email alredy taken'});
    }

    const hashedpassword = await bcrypt.hash(password,10);

    const newUser = new User({name,email,password:hashedpassword});
    await newUser.save();
    res.status(201).json({message:'Account Created Successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Internal server error'});
  }
});

router.post('/auth/login',validateLogin, async (req,res) => {
  try {
    const {email,password} = req.body;
    
    const user = await User.findOne({ email});
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
 
    const token = jwt.sign(
      { id: user._id,email:user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
       message:'Logged in successfully',
       token:token,
       name:user.name,
       id:user._id
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Internal server error'});   
  }
})

router.post('/tasks', authenticate, validateTask, async(req,res) => {
  try {
    const{title,description,status,deadline} = req.body;

    const newTask = new Task({
      user: req.user.id,
      title,
      description,
      status,
      deadline});
    await newTask.save();
    res.status(201).json({message:'Task created successfully',task:newTask});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Internal server error'});
  }
})

router.get('/tasks',authenticate, async(req,res) => {
  try {
    const tasks = await Task.find({
      user:req.user.id
    }).sort({createdAt:-1});

    if(tasks.length === 0){
      return res.status(200).json({ message: 'No tasks found for this user' });
    }

    const serializedTasks = tasks.map(task => ({
      id:task.id,
      title:task.title,
      description:task.description,
      status:task.status,
      deadline:task.deadline,
      createdTime:task.createdAt

    }))

    res.status(200).json({
      message:'Task Retched successfully',
      tasks:serializedTasks
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Internal server error'});
  }
})

router.put('/tasks/:id', authenticate, validateTask, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, deadline } = req.body;
    console.log(title, description, status, deadline)
    const task = await Task.findOne({ _id: id, user: req.user.id });

    if(!task){
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (deadline) task.deadline = deadline;

    await task.save();
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating task' });
  }
});

router.delete('/tasks/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
});




module.exports = router;
