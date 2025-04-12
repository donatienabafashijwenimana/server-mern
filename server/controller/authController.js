import express from 'express'
import bcrypt, { genSalt } from 'bcrypt'
import jwt from 'jsonwebtoken'

import users from '../model/usermodel.js'
import { generatetoken } from '../LIB/utlis.js'
import cloudinary from '../LIB/cloudinary.js'

export const register = async(req,res)=>{
    const {email,fullname,password} = req.body
    try{
        const user_uname_exist =  await users.findOne({fullname})
        const user_email_exist =  await users.findOne({email})
        if (user_uname_exist) return res.status(400).json({message:'username already exist'})
        if (user_email_exist) return res.status(400).json({message:'email already exist'})
        if (password.length < 6) return res.status(400).json({message:'un match password length'})
        
        const salt = await bcrypt.genSalt(10)
        const passwordhash= await bcrypt.hash(password,salt)

        const newuser = new users({
            fullname:fullname,
            email:email,
            password:passwordhash
        })
        if (newuser){
            generatetoken(newuser._id,res)
            await newuser.save()
            res.status(200).json({
                _id: newuser._id,
                fullname: newuser.username,
                email : newuser.email,
                profilePic: newuser.profilepic,
                message:'registartion success fully',
                token:generatetoken(newuser._id,res)
            })
        }else{
            res.status(400).json({message:'registartion failed'})
        }
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const login = async(req,res)=>{
    const {username , password} = req.body
    
    try {
        const user = await users.findOne({fullname:username})

        if (!user) return  res.status(400).json({message:'incorect username'})
            
        const ispassword = await bcrypt.compare(password,user.password)
        if (!ispassword) return res.status(400).json({message:"incorect password"})
        const token = generatetoken(user._id,res)
        generatetoken(user._id,res)
        
        res.status(200).json({
            _id:user._id,
            user_name:user.fullname,
            email:user.email,
            profilePic:user.profilePic,
            message:'login successfull',
            token: token
        })
    } catch (error) {
        console.log('error in login controller',error.message)
        res.status(500).json({message:'internal server error'})
    }
}
export const logout = (req,res)=>{
   try {
     res.cookie("token","",({maxAge:0}))
     res.status(200).json({message:'logout successfully'})
   } catch (error) {
     console.log('error in logout controller',error.message)
   }
}

export const updateprofile = async(req,res)=>{
    try {
        const {profilepic} = req.body
        const userid = req.user._id
        if (!profilepic)return res.status(400).json({message:'profile pic is required'})
        
        const uploadresponse = await cloudinary.uploader.upload(profilepic)
        const updateduser = await users.findByIdAndUpdate(userid,{profilepic:uploadresponse.secure_url},{new:true})
        res.status(200).json({user_data:updateduser,message:'data updated'})

    } catch (error) { 
        console.log(error)
        res.status(500).json({message:'image not uploaded'})
    }
}

export const checkauth = async(req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"internal server error"})
    }
}