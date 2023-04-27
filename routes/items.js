const express = require('express');
const router = express.Router();
const { authenticate } = require("../middlewares/auth");

const { Item } = require('../models');
// Create a new item
router.post('/', authenticate, async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).json(basket)
    } catch (error) {
        res.status(500).json({ message: 'Error creating item', error });
    }
})

// Get a list of all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving items', error });
    }
});

// Get an item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) {
            res.status(404).json({ message: 'Error retrieving the item' })
        }
        else {
            res.json(item)
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the item', error })
    }
});

// Update an item by ID
router.put('/:id', authenticate, async (req, res) => {    
    try {
        const [updated] = await Item.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedItem = await Item.findByPk(req.params.id);
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
});

// Delete a item by ID
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deleted = await Item.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ message: "Item deleted" });
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting item" });
    }
});

module.exports = router