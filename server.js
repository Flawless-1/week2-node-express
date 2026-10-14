require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Bonus: Request logger middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware for JSON parsing
app.use(express.json());

// Serve static HTML page at /
app.use(express.static(path.join(__dirname, 'public')));

// POST /user -> Accepts {name, email}; responds "Hello, [name]!"
app.post('/user', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Both 'name' and 'email' are required." });
    }

    res.send(`Hello, ${name}!`);
});

// GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    res.send(`User ${id} profile`);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});