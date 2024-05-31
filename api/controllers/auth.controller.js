import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
import { errHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

import 'dotenv/config'
import cookie from 'cookie-parser';

export const signup = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;
    
    if(!username || !email || !password){
      return res.status(401).json({ message: "all feilds are mandatory" });
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(401).json({ message: "email alredy exist" });
    }

    const existingUsername = await User.findOne({username});
    if(existingUsername){
     return res.status(401).json({ message: "username alredy exist" });
    }

    const hasedPass = bcrypt.hashSync(password,10);
  
    const newUser =await new User({ username, email, password:hasedPass});

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
     next(error); 
  }
};

export const signin = async(req,res,next)=>{
  try {
    const { email, password } = req.body;
    
    if( !email || !password){
      return res.status(401).json({ message: "all feilds are mandatory" });
    }

    const validUser =await User.findOne({email});
    if(!email){
     return next(errHandler(404,"User not registered"));
    }
     
    const validPassword = bcrypt.compareSync(password,validUser.password);

    if(!validPassword){
       return next(errHandler(404,"Password not match"));
    }
    
    const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET_KEY );

    //destrucre password from user so it be safe
    const { password:pass , ...rest}= validUser._doc;
    console.log(token);
    res
    .cookie('access_token',token ,{httpOnly: true})
    .status(200)
    .json(rest);
  }
  catch(error){
       next(error); 
  }
};
