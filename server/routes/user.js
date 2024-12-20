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

    try{

        const { email , password } = req.body;

        // check user is already signup or not || user is exist or not
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({error:"user not found"});

        // verify password 

        const passwordValid = await bcrypt.compare(password, user.password);
        if(!passwordValid) return res.status(404).json({ error: "password is wrong"});

        // creating jwt tokens

        const jwtSecret = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({id:user._id}, jwtSecret , {expiresIn: '1hr'});

        res.status(200).json({message: "user login successfully" , token });
    }
    catch(error){

        res.status(500).json({error: "signin failed"});

    }
});

module.exports = router;