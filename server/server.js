const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
    res.send('Server is running successfully');
});

// MongoDB Connection & Server Start
mongoose.connect('mongodb://localhost:27017/mern-db')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch((err) => console.error('Database connection error:', err));