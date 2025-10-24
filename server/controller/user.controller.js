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
            success: false
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
            sameSite: "Lax",
            secure: false,
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
            success: false
        })
    }
}

const getUser = async (req,res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success: false
            })
        }
        return res.status(200).json({
            user,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: true
        })
    }
}

const updateUser = async(req,res) => {
    try {
        const userId = req.id;
        const {fullname, email, oldPassword, newPassword} = req.body;
        if(!fullname && email && oldPassword && newPassword){
            return res.status(400).json({
                message:"Please provide data to update",
                success: false
            })
        }   
        
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success: false
            })
        }
        const updateData = {};

        if(fullname) updateData.fullname = fullname;
        if(email) updateData.email = email;

        if(oldPassword && newPassword){
            const isMatch = await Bcrypt.compare(oldPassword, user.password);
            if(!isMatch){
                return res.status(400).json({
                    message:"Old is password is incorrect",
                    success: false
                })
            }
            const hashedPassword = await Bcrypt.hash(newPassword, 10);
            updateData.password = hashedPassword;
        }else if (oldPassword || newPassword){
            return res.status(400).json({
                message:"Both old and new password are required to chnage password",
                success: false
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId,
            {$set: updateData},
            {new: true, runValidators: true}
        ).select('-password');

        return res.status(200).json({
            message:"User updated successfully",
            user: updatedUser,
            success: true,
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message,
            success: false
        })
    }
}

const logout = async(req,res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logout successful",
            success:true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {register, login, getUser, updateUser, logout};