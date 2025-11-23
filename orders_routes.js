const express = require('express');
const { getDB } = require('./database');
const router = express.Router();

// POST /orders
router.post('/', async (req, res) => {
    try {
        const db = getDB();
        const { ObjectId } = require('mongodb');
        const { name, phoneNumber, lessonIDs, spaces } = req.body;
        
        // Validate lessons exist
        const lessonObjectIds = lessonIDs.map(id => new ObjectId(id));
        const lessons = await db.collection('lessons')
            .find({ _id: { $in: lessonObjectIds } })
            .toArray();
            
        if (lessons.length !== lessonIDs.length) {
            return res.status(400).json({ error: 'One or more lessons not found' });
        }
        
        // Calculate total price
        const totalPrice = lessons.reduce((total, lesson) => total + lesson.price, 0) * spaces;
        
        const order = {
            name,
            phoneNumber,
            lessonIDs: lessonObjectIds,
            spaces,
            totalPrice,
            orderDate: new Date()
        };
        
        const result = await db.collection('orders').insertOne(order);
        const savedOrder = await db.collection('orders').findOne({ _id: result.insertedId });
        
        res.status(201).json({
            message: 'Order created successfully',
            order: savedOrder
        });
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /orders
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const orders = await db.collection('orders').find().toArray();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;