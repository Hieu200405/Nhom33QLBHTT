const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS configuration for both user and admin frontend
const corsOptions = {
  origin: [
    'http://localhost:3000', // User frontend
    'http://localhost:3001', // Admin frontend
    'http://localhost:3002'  // Alternative port
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '20mb' }));
app.use(morgan('dev'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sales_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const salesEventRoutes = require('./routes/salesEvents');
const employeeRoutes = require('./routes/employees');
const reviewRoutes = require('./routes/reviews');
const messageRoutes = require('./routes/messages');
const challengesRouter = require('./routes/challenges');
const addressRoutes = require('./routes/addresses');
const analyticsRoutes = require('./routes/analytics');
const settingsRoutes = require('./routes/settings');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/sales-events', salesEventRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/challenges', challengesRouter);
app.use('/api/addresses', addressRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.use('/assets/products', express.static(path.join(__dirname, 'assets/products')));
app.use('/assets/challenges', express.static(path.join(__dirname, 'assets/challenges')));
app.use('/assets/events', express.static(path.join(__dirname, 'assets/events')));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`CORS enabled for: ${corsOptions.origin.join(', ')}`);
  });
}

module.exports = app; 