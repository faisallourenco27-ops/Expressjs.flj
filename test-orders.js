const mongoose = require('mongoose');
require('dotenv').config();

const Order = require('./order');
const Lesson = require('./lesson');

const testOrders = async () => {
    try {
        console.log('🧪 Testing Orders Collection...');
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');
        
        // Get some lesson IDs first
        const lessons = await Lesson.find().limit(2);
        if (lessons.length < 2) {
            console.log('❌ Need at least 2 lessons in database');
            return;
        }
        
        // Test 1: Create order with single lesson
        console.log('\n📝 Testing Single Lesson Order...');
        const singleOrder = new Order({
            name: 'John Smith',
            phoneNumber: '1234567890',
            lessonIDs: [lessons[0]._id],
            spaces: 2
        });
        
        const savedSingle = await singleOrder.save();
        await savedSingle.populate('lessonIDs');
        console.log('✅ Single Lesson Order Created:', savedSingle.name);
        
        // Test 2: Create order with multiple lessons
        console.log('\n📝 Testing Multiple Lessons Order...');
        const multiOrder = new Order({
            name: 'Sarah Johnson',
            phoneNumber: '0987654321',
            lessonIDs: [lessons[0]._id, lessons[1]._id],
            spaces: 1
        });
        
        const savedMulti = await multiOrder.save();
        await savedMulti.populate('lessonIDs');
        console.log('✅ Multiple Lessons Order Created:', savedMulti.name);
        console.log('   Lessons:', savedMulti.lessonIDs.map(l => l.topic));
        
        // Test 3: Get all orders
        console.log('\n🔍 Testing Order Retrieval...');
        const allOrders = await Order.find().populate('lessonIDs');
        console.log('✅ Total orders:', allOrders.length);
        
        // Clean up
        console.log('\n🧹 Cleaning up test orders...');
        await Order.deleteMany({ _id: { $in: [savedSingle._id, savedMulti._id] } });
        console.log('✅ Order tests completed!');
        
    } catch (error) {
        console.error('❌ Order test failed:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

testOrders();