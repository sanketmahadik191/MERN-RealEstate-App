import bcrypt from 'bcrypt';
import User from "../models/user.model.js";

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
