const User = require('../models/User')
const jwt = require("jsonwebtoken");

//Generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
};

//Register User
exports.registerUser = async(req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body;

    //Validation : Check for missing fields
    if(!fullName || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    try{
        //Check if email already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already exists"});
        }

        //Create new User
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        return res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    }
    catch(err){
        return res.status(500).json({message: "Error Registering user", error: err.message});
    }
};

//Login user
exports.loginUser = async(req, res) => {
    const {email, password} = req.body;

    //Validation : check for missing fields
    if(!email || !password){
        return res.status(400).json({message : "All fields are required"});
    }

    try{
        //check if user exists and if exists compare the password.
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message: "Please enter correct credentials"});
        }
        
        const token = generateToken(user._id)

        console.log(user._id, user, token)

        return res.status(200).json({
            id: user._id,
            user,
            token
        });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message: "Error logging in", error: err.message});
    }
};


//Get user info
exports.getUserInfo = async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        return res.status(200).json(user);
    }
    catch(err){
        return res.status(500).json({message: "Error getting userinfo", error: err.message});
    }
};