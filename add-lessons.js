const { connectDB } = require('./database');
require('dotenv').config();

const addAllLessons = async () => {
    try {
        const db = await connectDB();
        
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

        await db.collection('lessons').deleteMany({});
        await db.collection('lessons').insertMany(allLessons);
        
        console.log('✅ All lessons added with native driver!');

        // Display what was added
        const lessons = await db.collection('lessons').find().toArray();
        console.log('\n📚 Lessons in database:');
        lessons.forEach(lesson => {
            console.log(`   - ${lesson.topic} | ${lesson.location} | £${lesson.price} | ${lesson.space} spaces`);
        });


        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
};

addAllLessons();
        
      