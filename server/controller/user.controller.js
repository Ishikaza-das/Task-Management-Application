const User = require('../models/user.model');
const Bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req,res) => {
    try {
        const { fullname, email, password } = req.body;
        if(!fullname || !email || !password){
            return res.status(400).json({
                message:"Something is missing",
                success: false
            })
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exists",
                success: false
            })
        }
        const hashedPassword = await Bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message:"User register successfully",
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: true
        })
    }
}

const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"Something is missing",
                success: false
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
               message:"This Email does not exist" 
            })
        }
        const isPassword = await Bcrypt.compare(password, user.password);
        if(!isPassword){
            return res.status(400).json({
                message: "Incorrect Password",
                success: false
            })
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn:"7d",
        });
        res.cookie("token",token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 7*24*60*60*1000
        });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email
        }
        return res.status(200).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: true
        })
    }
}

module.exports = {register, login};