const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.get('/', async (req, res)=>{
    try{
        const contacts = await Contact.find().sort({createdAt: -1});
        res.status(200).json(contacts);
    } catch (error){
        res.status(500).json({message: error.message});
    }
});

router.post('/', async (req, res)=>{
    try{
        const {name, email, subject, message} = req.body;
        if(!name || !email || !subject || !message){
            return res.status(400).json({message: 'All Fields are required'});
        }
        const newContact = new Contact({name, email, subject, mesage});
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error){
        res.status(400).json({message: errror.message});
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if(!deletedContact) return res.status(404).json({message: 'Contact not found'});
        res.status(200).json({message: 'Contact deleted successfullt'});
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
