const express=require("express");
const { body, validationResult } = require('express-validator');

const User=require("../models/user.models");

const router=express.Router();

router.post("", 
body("email").isEmail(),
body("pincode").isLength(6),
body("age").custom((value)=>{
if(value<1 || value>100){
    throw new Error("Invalid Age")
}
return true
}),

async(req,res)=>{

    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }


        const user=await User.create(req.body);
        return res.status(201).send(user);
    }
    catch(err){
        return res.status(501).send(err);
    }
});

module.exports=router;