const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


// signup route

router.post('/signup' , async (req,res)=>{

    try{
        const {name ,sports ,email ,phone ,password } = req.body;

        // hasedPassword 

        const hasedPassword = await bcrypt.hash(password, 10);

        //making new user

        const newUser = new User({ name ,sports ,email ,phone ,password: hasedPassword });
        await newUser.save();

        res.status(201).json({message: 'usercreated succesfully'}); 

    }catch(error){
        res.status(500).json({error: 'Failed to create user'}); 
    }

});


// signin route

router.post('/signin' , async (req,res)=>{

    const { email , password } = req.body;

    
})