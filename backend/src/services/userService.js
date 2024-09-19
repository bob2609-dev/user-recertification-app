const db = require('../models/userModel');

// Create a new user
const createUser = (user) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users SET ?';
      db.query(query, user, (err, results) => {
        if (err) {
          console.error('Error inserting user:', err.message);
          return reject(err);
        }
        resolve(results);
      });
    });
  };

// Get all users
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE is_deleted = false';
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Get user by ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE id = ? AND is_deleted = false';
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length === 0) {
        return resolve(null);
      }
      resolve(results[0]);
    });
  });
};

// Update user
const updateUser = (id, user) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET ? WHERE id = ?';
    db.query(query, [user, id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Delete user (soft delete)
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET is_deleted = true WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
