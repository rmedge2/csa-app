const express = require('express');
const router = express.Router();

const { Basket, BasketItem, Item } = require('../models');

//Creating a new basket
router.post('/', async (req, res) => {
    try {
        const basket = await Basket.create(req.body);
        res.status(201).json(basket)
    } catch (error) {
        res.status(500).json({ message: 'Error creating the basket', error });
    }
})

// Get all baskets, including associated items
router.get('/', async (req, res) => {
    try {
        const baskets = await Basket.findAll();
        res.json(baskets);
    } catch (error){
        res.status(500).json({ message: 'Error retrieving baskets', error });
    }
});

// Get a specific basket by ID, including associated items
router.get('/:id', async (req,res) => {
    try {
        const basket = await Basket.findByPk(req.params.id);

        if (!basket){
            res.status(404).json({ message: 'Basket not found' });
        } else {
            res.status(404).json({ message: 'Basket not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating basket', error });
    }
});

// Update a basket by ID
router.put('/:id', async (req,res) => {
    try {
        const [updated] = await Basket.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated){
            const updatedBasket = await Basket.findByPk(req.params.id);
            res.json(updatedBasket);
        } else {
            res.status(404).json({ message: 'Basket not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating basket', error });
    }
});

// Delete a basket by ID
router.delete('/:id')

module.exports = router;