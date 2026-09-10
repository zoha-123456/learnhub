require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('./models/Course');
const Course = require('./models/Course');

const sampleCourses = [
    {
        title: 'Web Development',
        description: 'Learn to bulid modern websites from scratch using HTML, CSS, and JavaSscript',
        instructor: 'Sarah Ahmed',
        duration: '8 Weeks',
        level: 'Beginner',
        price: '49',
        category: 'Web Development',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyvErr0qMRlBxdnmW3zq_ZIOANBvvKS5bX7ZQQumDPeA&s=10',
    },

    {
        title: 'JavaScript Essentials',
        description: 'Master JavaScript fundamentals: variable, functions, array, objects, and DOM',
        instructor: 'Bilal Khan',
        duration: '6 Weeks',
        level: 'Beginner',
        price: '39',
        category: 'Programming',
        image: 'https://files.ably.io/ghost/prod/2023/12/choosing-the-best-javascript-frameworks-for-your-next-project.png',
    },

    {
        title: 'React.js for Beginners',
        description: 'Build interactive user interfaces with components, props, state, and hooks',
        instructor: 'Ayesha Malik',
        duration: '3 Weeks',
        level: 'Beginner',
        price: '59',
        category: 'Frontend',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyxzvj083WoEelk1llJfTmyydaT-92r3rvF9nK_s-4-w&s=10',
    },

    {
        title: 'Node.js & Express',
        description: 'Bulid powerful backend servers and REST APIs eith Node.js and Express',
        instructor: 'Hamza Sheikh',
        duration: '5 Weeks',
        level: 'Intermediate',
        price: '59',
        category: 'backend',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXDp2hRy0BsZHN4Ndjqg8jpWErwxV1FioqmnjjQ6nHMQ&s=10',
    },

    {
        title: 'MongoDB Database',
        description: 'Learn NoSQL database, schemas, and Mongoose to store real application data',
        instructor: 'Fatima noor',
        duration: '4 Weeks',
        level: 'Intermediate',
        price: '49',
        category: 'Database',
        image: 'hhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhU24J9iOI3DMJZoGaDkE9IQfQGgIT_3qRy5yUxJJ0hg&s=10',
    },

    {
        title: 'Full Stack Develpoment',
        description: 'combine React, Node.js, Exprss, and MongoDB to bulid copmlete applications',
        instructor: 'Usman Taqiq',
        duration: '10 Weeks',
        level: 'Advanceed',
        price: '99',
        category: 'Full Stack',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQedGFBwqthPDkPzzkHsQwrRVn3dB6YZrlatA5KfKLEAA&s=10',
    },
]

mongoose.connect(process.env.MONGO_URI).then(async () =>{
    await Course.deleteMany();
    await Course.insertMany(sampleCourses);
    console.log("sample courses added to Mongo Altas");
    mongoose.connection.close();
})
.catch((error)=> console.error('Seed error:', error.message));