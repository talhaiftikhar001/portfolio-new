require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/db');

const projectRoutes = require('./routes/projects');
const statsRoutes = require('./routes/stats');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());

// CORS configuration - allow requests from client address
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  process.env.CLIENT_URL_ALT || 'http://localhost:3000',
  'http://localhost:5000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, tools, or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // In development, log and allow for testing ease
      console.warn(`CORS blocked request from origin: ${origin}. Proceeding for development.`);
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Global Rate Limiter for general endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' }
});

// Stricter Rate Limiter for contact endpoint to prevent spam
const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 contact requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many contact messages sent. Please wait a minute before trying again.' }
});

// Apply Rate Limiters
app.use('/api/', apiLimiter);
app.use('/api/contact', contactLimiter);

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is healthy and running' });
});

// Root handler
app.get('/', (req, res) => {
  res.send('Portfolio API Server is running.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// Connect to Database & start Server
const startServer = async () => {
  await connectDB();
  if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health Check: http://localhost:${PORT}/health`);
    });
  }
};

startServer();

module.exports = app;
