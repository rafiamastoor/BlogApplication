const express = require("express");
const router = express.Router();
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register a new user
router.post("/signup", async (req, res) => {
  console.log("Signup request received:", req.body);
  try {
    const { user_name, user_password } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);

    // Create the user
    const newUser = await User.create({
      user_name,
      user_password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Signup failed", details: error.message });
  }
});

//route to login existing user
router.post("/login", async (req, res) => {
  try {
    const { user_name, user_password } = req.body;
    const user = await User.findOne({ where: { user_name } });
    console.log(user)

    if (!user) return res.status(400).json({ error: "Invalid username or password" });

    const validPassword = await bcrypt.compare(user_password, user.user_password);
    if (!validPassword) return res.status(400).json({ error: "Invalid username or password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.json({ message: "Login successful", token, userid: user.id});
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { user_name, user_password } = req.body;
    const user = await User.create({ user_name, user_password });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user", details: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user" });
  }
});

// Update a user by id
router.put("/:id", async (req, res) => {
  try {
    const { user_name, user_password } = req.body;
    await User.update({ user_name, user_password }, { where: { id: req.params.id } });

    const updatedUser = await User.findByPk(req.params.id);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// Delete a user by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
