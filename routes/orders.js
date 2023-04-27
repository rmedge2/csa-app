const express = require('express');
const router = express.Router();
const { authenticate } = require("../middlewares/auth");

const { Order } = require('../models');
// Create a new order
router.post('/', authenticate, async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(basket)
    } catch (error) {
        res.status(500).json({ message: 'Error creating Order', error });
    }
})

// Get a list of all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
});

// Get an order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            res.status(404).json({ message: 'Error retrieving the item' })
        }
        else {
            res.json(item)
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the item', error })
    }
});

// Update an order by ID
router.put('/:id', authenticate, async (req, res) => {    
    try {
        const [updated] = await Order.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedItem = await Order.findByPk(req.params.id);
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
});

// Delete a order by ID
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deleted = await Order.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ message: "Order deleted" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting order" });
    }
});

module.exports = router