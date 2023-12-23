const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const crypto = require('crypto');
const debug = require('debug')('express-openid-connect');
// Added modules
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit');
const expressValidator = require('express-validator');
const winston = require('winston');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');


const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
const emailTemplatesRoutes = require('./routes/emailTemplateRoutes');
const tradingRoutes = require('./routes/tradingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const programsRouter = require('./api/programs');
const webhookRoutes = require('./routes/webhookRoutes'); // adjust the path as needed

const User = require('./models/user');
const Program = require('./models/program');
// or { session: true } based on your setup
const connectDatabase = require('./database');
connectDatabase();

const app = express();
// Import your controller that handles saving the template
// Serve static files from the 'views' directory
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// If we're not in production, also log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}



app.set('view engine', 'ejs');


// Security-related middleware should come first
app.use(helmet());
app.use(cookieParser());
app.use(csurf({ cookie: true }));

// Rate limiting
//app.use(limiter);

// Body parsing middleware should be placed before your routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Enable debugging for express-openid-connect
debug.enabled = true;

// Views Routes
app.get('/dashboard', (req, res) => res.render('dashboard'));
app.get('/charts-c3', (req, res) => res.render('charts-c3'));
app.get('/profile', (req, res) => res.render('profile'));
app.get('/emails', (req, res) => res.render('emails'));
app.get('/settings', (req, res) => res.render('settings'));
app.get('/payouts', (req, res) => res.render('payouts'));
app.get('/create-users', (req, res) => res.render('create-users'));
app.get('/show-users', (req, res) => res.render('show-users'));
app.get('/change-password', (req, res) => res.render('change-password'));
app.get('/create-programs', (req, res) => res.render('create-programs'));
app.get('/webhooks', (req, res) => res.render('webhooks'));
app.get('/show-programs', async (req, res) => {
    try {
        const programs = await Program.find() || [];
        res.render('show-programs', { programs: programs, adminName: 'Richard M' });
    } catch (error) {
        console.error('Error fetching programs:', error);
        res.status(500).send('Error fetching programs');
    }
});
app.get('/form', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});



// Use the email template routes

// API and Route Handlers
app.use('/api', programsRouter);
app.use('/api', emailRoutes);
app.use('/api', emailTemplatesRoutes);
app.use('/api', tradingRoutes);
app.use('/webhooks', webhookRoutes);
// Admin and User Routes
app.use('/admin', adminRoutes);
app.use('/', userRoutes); // User routes are likely to be the base routes


// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    // CSRF token errors handling
    return res.status(403).send('CSRF token error');
  }
  next(err);
});
// ... (other custom route handlers)
// Import and execute the script for inserting email templates
// Import necessary modules and models


// Initialize Winston logger


logger.info('Informational message');
logger.error('Error message');
// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100
});


// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
