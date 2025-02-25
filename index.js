const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require("cors");
const auth = require('./auth');
const Task = require('./models/Task');
const User = require('./models/User');

const app = express();

app.use(cors({
  origin: '*', // Allow all origins
  methods: 'GET,POST,PUT,DELETE,OPTIONS', // Include OPTIONS for preflight
  allowedHeaders: '*', // Allow necessary headers
}));

// Handle preflight requests explicitly
app.options('*', cors()); // Allow preflight for all routes


const PORT = 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)

  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/tasks', taskRoutes); // Task routes (protected)

app.get('/', async (req, res) => {
  

  res.json({msg: "hello world" })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});