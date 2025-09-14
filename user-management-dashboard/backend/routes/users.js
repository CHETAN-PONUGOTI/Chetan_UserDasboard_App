// backend/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../database.js');

// GET: Get all users
router.get("/", (req, res) => {
    const sql = "SELECT * FROM users";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        res.status(200).json({ data: rows });
    });
});

// GET: Get a single user by ID
router.get("/:id", (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        if (!row) {
            return res.status(404).json({ "error": "User not found" });
        }
        res.status(200).json({ data: row });
    });
});

// POST: Create a new user
router.post("/", (req, res) => {
    const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;
    if (!name || !email) {
        return res.status(400).json({ "error": "Name and email are required fields." });
    }

    const sql = `INSERT INTO users (name, email, phone, company, street, city, zipcode, lat, lng) VALUES (?,?,?,?,?,?,?,?,?)`;
    const params = [name, email, phone, company, street, city, zipcode, lat, lng];

    db.run(sql, params, function(err) {
        if (err) {
            // Check for UNIQUE constraint failure
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ "error": "Email already exists." });
            }
            return res.status(400).json({ "error": err.message });
        }
        res.status(201).json({
            message: "User created successfully",
            id: this.lastID
        });
    });
});

// PUT: Update a user
router.put("/:id", (req, res) => {
    const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;
    
    // Basic validation
    if (!name || !email) {
        return res.status(400).json({ "error": "Name and email are required fields." });
    }

    const sql = `UPDATE users SET
                 name = ?, email = ?, phone = ?, company = ?,
                 street = ?, city = ?, zipcode = ?, lat = ?, lng = ?
                 WHERE id = ?`;
    const params = [name, email, phone, company, street, city, zipcode, lat, lng, req.params.id];

    db.run(sql, params, function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ "error": "Email already exists." });
            }
            return res.status(400).json({ "error": err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ "error": "User not found" });
        }
        res.status(200).json({
            message: "User updated successfully",
            changes: this.changes
        });
    });
});

// DELETE: Delete a user
router.delete("/:id", (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.run(sql, req.params.id, function(err) {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ "error": "User not found" });
        }
        res.status(200).json({ "message": "User deleted successfully" });
    });
});

module.exports = router;