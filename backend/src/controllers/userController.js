const userService = require("../services/userService");

// Create a new user
const createUser = async (req, res) => {
  try {
    const user = req.body;
    console.log("🔥 -- Printing Request Body ");

    console.log(user);
    console.log(      "--------------------------------------------------- "    );
    const result = await userService.createUser(user);
    res.status(201).json({ id: result.insertId, ...user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const result = await userService.updateUser(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user (soft delete)
const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
