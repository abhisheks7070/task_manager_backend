require("dotenv").config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const auth = require("../auth");
const Task = require("../models/Task");

const router = express.Router();
// Route: Create a new user
router.post('/register',auth, async (req, res) => {
  try {
    const user = req.user
    const { name, email, password, type, designation } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      type, 
      designation
    });
    
    await newUser.save();
    res.status(201).json({message: 'User created successfully'});
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// Route: User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    
    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });
  
    
    console.log(user._id)
    // Generate a JWT token
    const token = jwt.sign({id: user._id, name: user.name, email: user.email, type: user.type}, process.env.JWT_SECRET)
    res.status(200).json({ type: user.type, message: 'Login successful', token });

  } catch (err) {
    res.status(500).json({ message: 'Error logging in'});
  }
});

router.get('/', auth, async (req, res) => {
  let tasks
  req.user.type == "employee" ? tasks = await Task.find({ employee: req.user.email }) : tasks = await Task.find({})

  // console.log(req.user.email)
  // console.log(tasks)

  res.json({ ...req.user, tasks: tasks })
})

module.exports = router;