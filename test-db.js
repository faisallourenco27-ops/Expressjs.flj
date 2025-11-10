const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lessonbooking';

console.log('Using MONGODB_URI:', MONGODB_URI);

// Import your Lesson model
const Lesson = require('./lesson'); 

const testDatabase = async () => {
    try {
        console.log('🧪 Testing MongoDB Connection...');
        
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully!');
        
        // Test 1: Create a sample lesson
        console.log('\n📝 Testing Lesson Creation...');
        const sampleLesson = new Lesson({
            topic: 'Mathematics',
            price: 50,
            location: 'London',
            space: 5
        });
        
        const savedLesson = await sampleLesson.save();
        console.log('✅ Lesson Created:', savedLesson.topic);
        
        // Test 2: Find all lessons
        console.log('\n🔍 Testing Lesson Retrieval...');
        const lessons = await Lesson.find();
        console.log('✅ Lessons in database:', lessons.length);
        lessons.forEach(lesson => {
            console.log(`   - ${lesson.topic} (${lesson.location}) - $${lesson.price}`);
        });
        
      
        console.log('\n🧹 Cleaning up test data...');
        await Lesson.deleteOne({ _id: savedLesson._id });
        console.log('✅ Test completed successfully!');
        
    } catch (error) {
        console.error('❌ Database test failed:', error.message);
    } finally {
        mongoose.connection.close();
        console.log('🔌 Database connection closed');
    }
};

testDatabase();