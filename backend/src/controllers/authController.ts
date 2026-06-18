import {User} from '../models/User';
import bcrypt from 'bcrypt';
import { AnyARecord } from 'dns';
import jwt from 'jsonwebtoken';

interface LoginRequest {
    username: string;
    password: string;
}

const login = async (req : LoginRequest,res:any)=>{
    const {username,password} = req;
    try{
        const existingUser = await User.findOne({username});
        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        if(!process.env.JWT_SECRET){
            return res.status(500).json({message:"Server configuration error"});
        }
        const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({result:existingUser,token});
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}
const register = async (req:any,res:any)=>{
    const {username,password,email,mobile,resume} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = await User.create({username,password:hashedPassword,email,mobile,resume});
        if(!process.env.JWT_SECRET){
            return res.status(500).json({message:"Server configuration error"});
        }
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(201).json({result:newUser,token});
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}       

export {login,register};