//chandiofatima02_db_user
//e0IoJi9oIuFmTkRE
// mongodb+srv://chandiofatima02_db_user:e0IoJi9oIuFmTkRE@cluster0.irmlbjf.mongodb.net/

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/contacts', contactRoutes);

app.get('/', (req, res)=>{
    res.send('LearnHub API is running');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('MongoDB Altas connected');
    app.listen(PORT, ()=> console.log(`server running on http://localhost:${PORT}`));
})

.catch((error)=> console.error('MongoDB connection error:', error.message));