import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: 'All feilds are required'
            })
        };

        const existingUser = await User.findOne({email});
        
        if(existingUser){
            return res.status(400).json({
                message: 'User already exists'
            });
        };
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword
        }], { session });

        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN})

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: newUsers[0],
                token
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};
export const signIn = async (req, res) => {

    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: 'All feilds are required'
        })
    };

    const existingUser = await User.findOne({email});

    if(!existingUser){
        return res.status(404).json({
            message: 'User not found'
        })
    };

    const isPasswordSame = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordSame){
        return res.status(401).json({
            message: 'Invalid credentials'
        })
    };

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN})

    res.status(200).json({
        success: true,
        message: 'User signed in successfully',
        data: {
            user: existingUser,
            token
        }
    });
};
export const signOut = async (req, res) => {
    res.json({ message: 'Sign Out' });
};