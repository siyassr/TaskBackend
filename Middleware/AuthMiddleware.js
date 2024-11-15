import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";

const Protect = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.cookie){
      token = req.headers.cookie.split("=")[1];
      console.log(token)
    }else{
      console.log("jhghjk")
    }
      if (token) 
    
       try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const id = decoded.userId;
    
        // console.log("ID", id);
    
        const user = await User.findById(id);
        req.user = user;
        next();
       }catch(err){
        res.status(400).send(err.message)
    
       }   
});

export default Protect;
