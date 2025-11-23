const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

const connectDB = async () => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        db = client.db('lessonbooking');
        console.log('✅ MongoDB Connected with Native Driver');
        return db;
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

const getDB = () => {
    if (!db) throw new Error('Database not connected');
    return db;
};

module.exports = { connectDB, getDB };