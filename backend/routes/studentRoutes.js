const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/', async (req, res)=>{
    try{
        const students = await Student.find().sort({createdAt: -1});
        res.status(200).json(students);
    } catch (error){
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req, res)=>{
    try{
        const student = await Student.findById(req.params.id);
        if(!student) return res.status(404).json({message: 'Student Not Found'});
        res.status(200).json(student);
    } catch(error){
        res.status(500).json({message: error.message
        });
    }
});

router.post('/', async (req, res)=>{
    try{
        const {name, email, age, city, course, phone} = req.body;
        if(!name || !email || !age || !city || !course || !phone){
            return res.status(400).json({message: 'All Fields are required'});
        }
        const newStudent = new Student({name, email, age, city, course, phone});
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error){
        res.status(400).json({message: error.message});
    }
});

router.put('/:id', async (req, res)=>{
    try{
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true, runValidators: true}
        );
        if(!updatedStudent) return res.status(404).json({message: 'Student Not found'});
        res.status(200).json(updatedStudent);
    } catch (error){
        res.status(400).json({message: error.message});
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if(!deletedStudent) return res.status(404).json({message: 'Student not found'});
        res.status(200).json({message: 'Student deleted successfullt'});
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
