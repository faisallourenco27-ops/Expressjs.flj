const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: [true, 'Lesson topic is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    space: {
        type: Number,
        required: [true, 'Space is required'],
        min: [0, 'Space cannot be negative']
    }
});

module.exports = mongoose.model('Lesson', lessonSchema);