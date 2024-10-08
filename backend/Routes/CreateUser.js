require('dotenv').config();
const express=require('express');
const User=require('../models/User');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secretkey=process.env.secretKey;
const { body, validationResult } = require('express-validator');
router.post('/createuser',[
    body('email','incorrect email').isEmail(),
    body('password','Incorrect password').isLength({ min: 5 }),
    body('name').isLength({ min: 4 })
], 
async (req,resp)=>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
        const salt=await bcrypt.genSalt(10);
        const securepass=await bcrypt.hash(req.body.password,salt)

    try {
         
        let email=req.body.email;
        // console.log(User);
        let userdata=await User.findOne({email});
        if(!userdata)
        {
            
            await User.create({
                name:req.body.name,
                email:req.body.email,
                location:req.body.location,
                password:securepass
            })
            resp.json({success:true});
        }
        else
        {
                return resp.status(400).json({error:"User already exist please login!"})
        }
       
        
    } catch (error) {
        console.log(error);
        resp.json({success:false});
    }
})


router.post('/loginuser',[
    body('email','incorrect email').isEmail(),
    body('password','Incorrect password').isLength({ min: 5 }),
    
], 
async (req,resp)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }
    
    
    let email=req.body.email;
    try {
        const Userdata=await User.findOne({email});
        // console.log(User)
        if(!Userdata)
        {
            return resp.status(400).json({ errors: "Try Loging with correct credentials" });
        }
        const pswdcomp=await bcrypt.compare(req.body.password,Userdata.password)
        if(!pswdcomp)
        {
            return resp.status(400).json({ errors:"Password Incorrect"});
        }
        const data={
            User:{
                id:Userdata.id
            }
        }
            const AuthToken=jwt.sign(data,secretkey)

        return resp.json({success:true,AuthToken:AuthToken});
    } catch (error) {
        console.log(error);
        resp.json({success:false});
    }
})
module.exports=router;