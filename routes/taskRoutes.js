const express = require('express');
const auth = require('../auth');
const Task = require('../models/Task');
const User = require('../models/User');

const router = express.Router();

// Route: Add a new task (Protected route)
router.post('/', auth, async (req, res) => {
  try {
    const { admin, employee, title, description, priority, date, category, active, rejected, new_task, completed, submitted } = await req.body;
    
    // Create a new task
    const newTask = new Task({
      title,
      description,
      priority,
      date,
      category,
      active,
      rejected,
      new_task,
      completed,
      submitted,
      admin, 
      employee
    });
    
    // console.log("hello")
    await newTask.save();
    

    res.status(201).json({ message: 'Task added successfully', task: newTask });
  } catch (err) {
    res.status(500).json({ message: 'Error adding task', error: err.message });
  }
});

// Route: Update a task (Protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
});

module.exports = router;