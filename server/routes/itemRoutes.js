const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const upload = require('../middleware/upload'); 

router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/items', upload.single('image'), async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.file ? req.file.path : '' 
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/items/:id', async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;