const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cronJobs = require('./services/cronJobs');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mount routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Initialize cron jobs after server starts
  cronJobs.init();
});
