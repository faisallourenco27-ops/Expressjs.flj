const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true,
        match: [/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d+$/, 'Phone number can only contain numbers']
    },
    lessonIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    }],
    spaces: {
        type: Number,
        required: [true, 'Number of spaces is required'],
        min: [1, 'Must book at least 1 space']
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);