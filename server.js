const express = require('express');
const logger = require('./logger');

const app = express();
const PORT = 3000;

app.use(logger); 

app.get('/', (_req, res) => {
    res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});