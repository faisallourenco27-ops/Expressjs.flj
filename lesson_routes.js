const express = require('express');
const { getDB } = require('./database');
const router = express.Router();

// GET /lessons
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const lessons = await db.collection('lessons').find().toArray();
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /lessons/:id
router.put('/:id', async (req, res) => {
    try {
        const db = getDB();
        const { ObjectId } = require('mongodb');
        
        const result = await db.collection('lessons').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        
        const updatedLesson = await db.collection('lessons').findOne(
            { _id: new ObjectId(req.params.id) }
        );
        
        res.json(updatedLesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;