const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

//const MONGO_URL = "mongodb://localhost:27017/fullstackdb";
const MONGO_URL =
    process.env.MONGO_URL || "mongodb://localhost:27017/fullstackdb";

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

// User Model
const User = mongoose.model("User", userSchema);

// Connect to MongoDB
mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

// Home route
app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

// Message API
app.get("/api/message", (req, res) => {
    res.json({
        message: "Hello from Node.js backend!"
    });
});

// Get all users
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch users"
        });
    }
});

// Add a user
app.post("/api/users", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email
        });

        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({
            error: "Failed to create user"
        });
    }
});