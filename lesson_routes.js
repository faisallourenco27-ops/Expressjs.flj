const express = require('express');
const Lesson = require('./lesson');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Lesson routes are working!' });
});

// GET /lessons - returns all lessons as JSON
router.get('/', async (req, res) => {
    try {
        const lessons = await Lesson.find();
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /lessons/:id - update any lesson attribute
router.put('/:id', async (req, res) => {
    try {
        const { topic, location, price, space } = req.body;
        const updatedLesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            { topic, location, price, space },
            { new: true, runValidators: true }
        );
        
        if (!updatedLesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        
        res.json(updatedLesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;