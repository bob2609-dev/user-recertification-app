const mysql = require("mysql2");
const dbConfig = require("../config/dbConfig");

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL database!");
});

const createUserTable = `
 CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ad_username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  active BOOLEAN DEFAULT true,
  role VARCHAR(50),
  last_login TIMESTAMP,
  is_deleted BOOLEAN DEFAULT false,
  -- permissions JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

`;

db.query(createUserTable, (err) => {
  if (err) {
    console.error("Error creating table:", err.message);
  }
});

module.exports = db;
