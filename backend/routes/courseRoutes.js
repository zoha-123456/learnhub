const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/', async (req, res)=>{
    try{
        const courses = await Course.find().sort({createdAt: -1});
        res.status(200).json(courses);
    } catch (error){
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req, res)=>{
    try{
        const course = await Course.findById(req.params.id);
        if(!course) return res.status(404).json({message: 'Course Not Found'});
        res.status(200).json(student);
    } catch(error){
        res.status(500).json({message: error.message
        });
    }
});

router.post('/', async (req, res)=>{
    try{
        const newCourse = new Course(req, body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error){
        res.status(400).json({message: errror.message});
    }
});

router.put('/:id', async (req, res)=>{
    try{
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true, runValidators: true}
        );
        if(!updatedCourse) return res.status(404).json({message: 'Course Not found'});
        res.status(200).json(updatedCourse);
    } catch (error){
        res.status(400).json({message: error.message});
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if(!deletedCourse) return res.status(404).json({message: 'Course not found'});
        res.status(200).json({message: 'Course deleted successfullt'});
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
