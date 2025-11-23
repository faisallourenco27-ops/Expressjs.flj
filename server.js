require('dotenv').config();
const express = require('express');
const logger = require('./logger');
const connectDB = require('./database');


const app = express();
const PORT = 3000;
connectDB();     

// Middleware 
app.use(logger); 
app.use(express.json());
app.use('/images', express.static('Lessonimages'));

// Routes 
app.use('/api/lessons', require('./lesson_routes'));
app.use('/api/orders', require('./orders_routes')); 


app.get('/', (req, res) => {
    res.json({ message: 'Lesson Booking API is running!' });
});

app.get('/', (_req, res) => {
    res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use('/images', express.static('Lessonimages'));

app.use('/images', (req, res, next) => {
    res.status(404).json({ error: 'Image not found' });
});