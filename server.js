const express = require('express');
const logger = require('./logger');
const connectDB = require('./database');


const app = express();
const PORT = 3000;
connectDB();     

app.use(logger); 

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