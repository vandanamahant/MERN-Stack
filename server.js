const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // .env file ko load karne ke liye

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. MongoDB Atlas Connection (.env se URI uthana)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Atlas Connected Successfully'))
.catch((err) => console.log('MongoDB Connection Error:', err));

// 2. Mongoose Schema aur Model
const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true }
});
const Item = mongoose.model('Item', ItemSchema);

// 3. GET Route: Data fetch karne ke liye
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. POST Route: Data save karne ke liye
app.post('/api/items', async (req, res) => {
    try {
        const newItem = new Item({ name: req.body.name });
        const savedItem = await newItem.save();
        res.json(savedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});