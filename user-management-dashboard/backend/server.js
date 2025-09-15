const express = require('express');
const cors = require('cors');
const db = require('./database.js'); // This import initializes the database connection
const userRoutes = require('./routes/users.js');

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: 'https://chetan-user-dasboard-mia31p94g-chetan-ponugotis-projects.vercel.app/',
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON request bodies

// Base Route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the User Management API" });
});

// API Routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});