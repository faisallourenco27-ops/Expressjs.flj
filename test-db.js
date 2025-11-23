const { connectDB } = require('./database');
require('dotenv').config();

const testDatabase = async () => {
    try {
        console.log('🧪 Testing MongoDB Connection (Native Driver)...');
        
        const db = await connectDB();
        console.log('✅ MongoDB Connected Successfully with Native Driver!');
        
        // Test 1: Create a sample lesson
        console.log('\n📝 Testing Lesson Creation...');
        const sampleLesson = {
            topic: 'Test Mathematics',
            price: 50,
            location: 'Test London', 
            space: 5
        };
        
        const result = await db.collection('lessons').insertOne(sampleLesson);
        console.log('✅ Lesson Created with ID:', result.insertedId);
        
        // Test 2: Find all lessons
        console.log('\n🔍 Testing Lesson Retrieval...');
        const lessons = await db.collection('lessons').find().toArray();
        console.log('✅ Lessons in database:', lessons.length);
        lessons.forEach(lesson => {
            console.log(`   - ${lesson.topic} (${lesson.location}) - £${lesson.price}`);
        });
        
        // Test 3: Clean up
        console.log('\n🧹 Cleaning up test data...');
        await db.collection('lessons').deleteOne({ _id: result.insertedId });
        console.log('✅ Test completed successfully!');
        
    } catch (error) {
        console.error('❌ Database test failed:', error.message);
    }
};

testDatabase();