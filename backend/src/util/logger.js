// logger.js

const winston = require('winston');

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
};

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info', // Set default log level
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json() // Log in JSON format
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to error.log
    new winston.transports.File({ filename: 'combined.log' }), // Log all other messages to combined.log
  ],
});

// Add a console transport for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
