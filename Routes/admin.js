import { Router } from "express";
import { adminModel, courseModel } from "../db.js";
import adminAuthMiddleware from "../Middlewares/adminAuth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

adminRouter.post('/course', adminAuthMiddleware ,async (req,res)=>{

    const { title, description, price, imageurl } = req.body;

    const creatorid = req.adminId;

    await courseModel.create({
        title,
        description,
        price,
        imageurl,
        creatorid
    })


    return res.json({
        msg:"Created a course"
    })
})

adminRouter.put('/course/:courseid',adminAuthMiddleware,async (req,res)=>{

    const courseid = req.params.courseid;

    const { title, description, price, imageurl } = req.body;

    await courseModel.updateOne({
        _id:courseid
    },{
        title,
        description,
        price,
        imageurl
    })

    return res.json({
        msg:"updated the course"
    })
})

adminRouter.delete('/course/:courseid',adminAuthMiddleware,async (req,res)=>{

    const courseid = req.params.courseid;

    await courseModel.deleteOne({
        _id:courseid
    })
    
    return res.json({
        msg:"Deleted the course"
    })
})

adminRouter.get('/course/bulk',adminAuthMiddleware,async (req,res)=>{

    const adminid = req.adminId;

    const courses = await courseModel.find({
        creatorid:adminid
    })

    return res.json({
        msg:"Got all your created courses",
        courses:courses
    })
})

export default adminRouter;