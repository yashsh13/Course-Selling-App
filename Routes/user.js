import { Router } from "express";
import { userModel } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const userRouter = Router();

userRouter.post('/signup',async (req,res)=>{

    const { email, password, firstname, lastname } = req.body;

    //Add zod, hash password etc

    await userModel.create({
        email:email,
        password:password,
        firstname:firstname,
        lastname:lastname
    })

    return res.json({
        msg:"You have signed up as user"
    })
})

userRouter.post('/login',async (req,res)=>{

    const { email, password } = req.body;

    //zod, unhash password etc

    const user = await userModel.findOne({
        email:email,
        password:password
    })

    if(!user){
        res.status(403).json({
            msg:"Invalid Credentials"
        })
    }

    const token = await jwt.sign({id:user._id},process.env.JWT_USER_PASS);

    //store the token in browser

    return res.json({
        msg:"You have logged in as user",
        token:token
    })
})

userRouter.get('/purchased',(req,res)=>{
    return res.json({
        msg:"Listed all the courses you have bought"
    })
})

export default userRouter;