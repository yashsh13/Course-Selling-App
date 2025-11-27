import { Router } from "express";
import { adminModel } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const adminRouter = Router();

adminRouter.post('/signup', async (req,res)=>{

    const { email, password, firstname, lastname} = req.body;

    //add zod, hashing

    await adminModel.create({
        email:email,
        password:password,
        firstname:firstname,
        lastname:lastname
    })

    return res.json({
        msg:"You have signedup as admin"
    })
})

adminRouter.post('/login',async (req,res)=>{

    const { email, password} = req.body;

    const admin = await adminModel.findOne({
        email:email,
        password:password
    })

    if(!admin){
        return res.status(403).json({
            msg:"Invalid Credentials for admin"
        })
    }

    const token = await jwt.sign({id:admin._id},process.env.JWT_ADMIN_PASS);
    //store token in browser 

    return res.json({
        msg:"You have logged in as admin",
        token:token
    })
})

adminRouter.post('/course',(req,res)=>{
    return res.json({
        msg:"Created a course"
    })
})

adminRouter.put('/course/:id',(req,res)=>{
    return res.json({
        msg:"updated the course"
    })
})

adminRouter.delete('/course/:id',(req,res)=>{
    return res.json({
        msg:"Deleted the course"
    })
})

adminRouter.get('/course/bulk',(req,res)=>{
    return res.json({
        msg:"Got all your created courses"
    })
})

export default adminRouter;