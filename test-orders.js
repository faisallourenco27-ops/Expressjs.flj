const { connectDB } = require('./database');
require('dotenv').config();

const testOrders = async () => {
    try {
        console.log(' Testing Orders Collection (Native Driver)...');
        
        const db = await connectDB();
        const { ObjectId } = require('mongodb');
        console.log('MongoDB Connected');
        
        // Get some lesson IDs first
        const lessons = await db.collection('lessons').find().limit(2).toArray();
        if (lessons.length < 2) {
            console.log('Need at least 2 lessons in database');
            return;
        }
        
        // Test 1: Create order with single lesson
        console.log('\n Testing Single Lesson Order...');
        const singleOrder = {
            name: 'Jimmy Smith',
            phoneNumber: '1234554321',
            lessonIDs: [new ObjectId(lessons[0]._id)],
            spaces: 2,
            totalPrice: lessons[0].price * 2,
            orderDate: new Date()
        };
        
        const singleResult = await db.collection('orders').insertOne(singleOrder);
        console.log('Single Lesson Order Created:', singleOrder.name);
        
        // Test 2: Create order with multiple lessons
        console.log('\n Testing Multiple Lessons Order...');
        const multiOrder = {
            name: 'Sarah Johnson', 
            phoneNumber: '0987654321',
            lessonIDs: [new ObjectId(lessons[0]._id), new ObjectId(lessons[1]._id)],
            spaces: 1,
            totalPrice: (lessons[0].price + lessons[1].price) * 1,
            orderDate: new Date()
        };
        
        const multiResult = await db.collection('orders').insertOne(multiOrder);
        console.log(' Multiple Lessons Order Created:', multiOrder.name);
        
        // Test 3: Get all orders
        console.log('\n Testing Order Retrieval...');
        const allOrders = await db.collection('orders').find().toArray();
        console.log('Total orders:', allOrders.length);
        
        // Clean up
        console.log('\n Cleaning up test orders...');
        await db.collection('orders').deleteMany({ 
            _id: { $in: [singleResult.insertedId, multiResult.insertedId] } 
        });
        console.log(' Order tests completed!');
        
    } catch (error) {
        console.error(' Order test failed:', error.message);
    }
};

testOrders();