import bcrypt from 'bcrypt';
import User from "../models/user.model.js";

export const signup = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;
    
    if(!username || !email || !password){
        next('All fields are mandatory')
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        next('Emial alredy in use')
    }

    const hasedPass = bcrypt.hashSync(password,10);
    console.log(hasedPass);

    const newUser = new User({ username, email, password:hasedPass});

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
    console.log(email);
  } catch (error) {
     next(error); 
  }
};
