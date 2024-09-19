require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost', // Default to localhost if not provided
  user: process.env.DB_USER || 'root',      // Default to root if not provided
  password: process.env.DB_PASSWORD || '',  // Default to empty string if not provided
  database: process.env.DB_DATABASE || 'user_rec_db', // Default database name if not provided
  port: process.env.DB_PORT || 3306          // Default port for MySQL
};

module.exports = dbConfig;
