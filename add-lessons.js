const mongoose = require('mongoose');
require('dotenv').config();
const Lesson = require('./lesson');

const addAllLessons = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Adding all lessons to database...');
        
        const allLessons = [
            {
                topic: 'Further Maths',
                location: 'Hendon', 
                price: 50,
                space: 5
            },
            {
                topic: 'Art & Design',
                location: 'Hendon',
                price: 55,
                space: 5
            },
            {
                topic: 'Basketball', 
                location: 'Hendon',
                price: 40,
                space: 5
            },
            {
                topic: 'Boxing',
                location: 'Barnet', 
                price: 55,
                space: 5
            },
            {
                topic: 'Coding',
                location: 'Harrow',
                price: 45, 
                space: 5
            },
            {
                topic: 'Cooking',
                location: 'Barnet',
                price: 35,
                space: 5
            },
            {
                topic: 'Drama',
                location: 'Harrow', 
                price: 30,
                space: 5
            },
            {
                topic: 'Football',
                location: 'Harrow',
                price: 35,
                space: 5
            },
            {
                topic: 'Karate',
                location: 'Barnet',
                price: 40,
                space: 5
            },
            {
                topic: 'Music',
                location: 'Barnet', 
                price: 60,
                space: 5
            }
        ];
        
        // Clear existing and add new lessons
        await Lesson.deleteMany({});
        await Lesson.insertMany(allLessons);
        
        console.log('✅ All 10 lessons added successfully!');
        
        // Display what was added
        const lessons = await Lesson.find();
        console.log('\n📚 Lessons in database:');
        lessons.forEach(lesson => {
            console.log(`   - ${lesson.topic} | ${lesson.location} | £${lesson.price} | ${lesson.space} spaces`);
        });
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

addAllLessons();