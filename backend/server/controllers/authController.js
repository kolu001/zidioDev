const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

// generate JWT token
const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn: '1h'}); 
};

// login user

exports.loginUser = async (req, res) => {
    const {emailId , password} = req.body;
    
    // validation
    if(!emailId || !password){
        return res.status(400).json({message : "All fields are required"});
    }

    try {
        const user = User.findOne({emailId});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message:"Invalid credentials"});
        }

        res.status(200).json({
            id: user._id,
            user,
            token:generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({
            message:"Error logging in user",
            errro:error.message,
        })
    }
};

// get user
exports.getUserInfo = async (req ,res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({
            message:"Error getting user info",
            error:err.message,
        });
    }
};


// register user
exports.regitserUser = async(req , res) =>{

};