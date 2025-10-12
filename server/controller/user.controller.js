const User = require('../models/user.model');
const Bcrypt = require('bcryptjs');

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

module.exports = {register};