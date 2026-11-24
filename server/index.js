const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToMongo = require('./db');
const app = express();

const PORT = process.env.PORT || 8181;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongo();

// API routes
app.use('/api/auth', require('./routes/auth'));

// Serve the built React website
app.use(express.static(path.join(__dirname, 'build')));

// Send any other page (like /login or /reviews) to the React app
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
