const express = require('express');
const { getDB } = require('./database');
const router = express.Router();

// POST /orders
router.post('/', async (req, res) => {
    try {
        console.log('Received order request:', req.body);
        
        const db = getDB();
        const { ObjectId } = require('mongodb');
        const { name, phoneNumber, lessonIDs, spaces } = req.body;
        
        // Validate required fields
        if (!name || !phoneNumber || !lessonIDs || !spaces) {
            return res.status(400).json({ 
                error: 'Missing required fields: name, phoneNumber, lessonIDs, spaces' 
            });
        }
        
        // Validate lessonIDs is an array
        if (!Array.isArray(lessonIDs) || lessonIDs.length === 0) {
            return res.status(400).json({ 
                error: 'lessonIDs must be a non-empty array' 
            });
        }
        
        console.log('🔍 Received lessonIDs:', lessonIDs);
        
        // Validate and convert lesson IDs with error handling
        let lessonObjectIds;
        try {
            lessonObjectIds = lessonIDs.map(id => {
                // Check if it's a valid 24-character hex string
                if (!id || typeof id !== 'string' || id.length !== 24) {
                    throw new Error(`Invalid lesson ID format: ${id}. Expected 24-character hex string.`);
                }
                
                // Check if it's a valid hex string
                if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                    throw new Error(`Invalid lesson ID format: ${id}. Not a valid hex string.`);
                }
                
                return new ObjectId(id);
            });
        } catch (error) {
            console.error(' ID conversion error:', error);
            return res.status(400).json({ error: error.message });
        }
        
        console.log('✅ Converted ObjectIds:', lessonObjectIds);
        
        // Validate lessons exist
        const lessons = await db.collection('lessons')
            .find({ _id: { $in: lessonObjectIds } })
            .toArray();
            
        if (lessons.length !== lessonIDs.length) {
            const foundIds = lessons.map(l => l._id.toString());
            const missingIds = lessonIDs.filter(id => !foundIds.includes(id));
            return res.status(400).json({ 
                error: `Lessons not found: ${missingIds.join(', ')}` 
            });
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
        
        console.log('Saving order:', order);
        const result = await db.collection('orders').insertOne(order);
        const savedOrder = await db.collection('orders').findOne({ _id: result.insertedId });
        
        console.log('Order created successfully');
        res.status(201).json({
            message: 'Order created successfully',
            order: savedOrder
        });
        
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ error: error.message });
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