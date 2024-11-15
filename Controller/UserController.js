import asyncHandler from 'express-async-handler';
import User from "../Models/UserModel.js"

import bcrypt from 'bcryptjs'; 
import jwt from "jsonwebtoken"

export const RegistreUser = asyncHandler(async (req, res) => {
    console.log(req.body); 
    const { firstname, lastname, email, password } = req.body;
    console.log(firstname, lastname, email, password)


   
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

   
    const hashedPassword = await bcrypt.hash(password, 10); 

    
    const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword 
    });

    if (user) {
        // const token = gntToken(res,user._id);
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
           
        
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});


// export const LoginUser = asyncHandler(async(req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//      if(user && await bycrypt.compare(password ,user.password)){
//         const token = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET)
//         res.cookie("user_token",token,{httpOnly:true});

//             res.status(201).json({
//                 _id: user._id,
//                 firstname: user.firstname,
//                 lastname: user.lastname,
//                 email: user.email
//             });
        
//     } else {
//         res.status(401);
//         throw new Error("Invalid email or password");
//     }
// });

export const LoginUser = asyncHandler(async(req,res)=>{
    const {  email, password } = req.body;

    const user = await User.findOne({email})

    if (user && user.password) { 
        const isMatch = await bcrypt.compare(password, user.password); 
        if (isMatch) {
            const token = jwt.sign({userId: user._id,userName:user.firstname}, process.env.ACCESS_TOKEN_SECRET);
            res.cookie("token", token, { httpOnly: true });
            console.log(process.env.NODE_ENV,"knjb")
           
            res.status(201).json({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                token: token
            });
        } else {
            res.status(401);
            throw new Error("Invalid password");
        }
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
})

export const logOut = asyncHandler(async(req,res)=>{
    res.clearCookie("token",{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        expires:new Date(0)
    })
    res.status(201).json({message:"logout"})
})

export const getAllUser  = asyncHandler(async(req,res)=>{
    
        try {
          const users = await User.find();
          res.json(users);
        } catch (error) {
          console.error("Error fetching users:", error.message);
          res.status(500).send("Server error");
        }
     
})