const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  active: { type: Boolean, default: false },
  rejected: { type: Boolean, default: false },
  new_task: { type: Boolean, default: true },
  completed: { type: Boolean, default: false },
  submitted: { type: Boolean, default: false },
  employee: { type: String, required: true },
  admin: { type: String, required: true },
});

module.exports = mongoose.model('Task', taskSchema);