const express = require('express');
const Order = require('./order');
const Lesson = require('./lesson');
const router = express.Router();

// POST create new order
router.post('/', async (req, res) => {
    try {
        const { name, phoneNumber, lessonIDs, spaces } = req.body;
        
        // Validate that lessons exist
        const lessons = await Lesson.find({ _id: { $in: lessonIDs } });
        if (lessons.length !== lessonIDs.length) {
            return res.status(400).json({ error: 'One or more lessons not found' });
        }
        
        // Calculate total price
        const totalPrice = lessons.reduce((total, lesson) => total + lesson.price, 0) * spaces;
        
        const order = new Order({
            name,
            phoneNumber,
            lessonIDs,
            spaces,
            totalPrice
        });
        
        const savedOrder = await order.save();
        
        // Populate the lesson details for response
        await savedOrder.populate('lessonIDs');
        
        res.status(201).json({
            message: 'Order created successfully',
            order: savedOrder
        });
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('lessonIDs');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('lessonIDs');
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;