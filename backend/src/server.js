
require("dotenv").config();

const express = require('express');
const mysql = require('mysql2');
const app = express();



const dbUsername =process.env.DB_USER
const dbPass =process.env.DB_PASSWORD
const dbHost =process.env.DB_HOST

// MySQL connection configuration
const db = mysql.createConnection({
  host: dbHost,
  user: dbUsername,
  password: dbPass, 
  database: 'user_rec_db'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }

  console.log('Connected to MySQL database!');
});

// Sample route
app.get('/', (req, res) => {
  res.send('Node.js and MySQL app is running!');
});

const PORT = 3383;
app.listen(PORT, () => {


  
  console.log(dbUsername)
  console.log(dbPass)
  console.log(dbHost)
  console.log(`Server is running on port ${PORT}`);
});
