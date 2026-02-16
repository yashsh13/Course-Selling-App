import { Router } from "express";
import { adminModel, courseModel } from "../db.js";
import adminAuthMiddleware from "../Middlewares/adminAuth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const adminRouter = Router();

adminRouter.post('/signup', async (req,res)=>{
    try{
        const AdminSignupSchema = z.object({
            email: z.email(),
            password: z.string().min(3).max(15),
            firstname: z.string(),
            lastname: z.string()
        });

        const validate = AdminSignupSchema.safeParse(req.body);

        if(!validate.success){
            return res.status(403).json({
                msg: "Zod validation error",
                error: validate.error
            })
        };

        const { email, password, firstname, lastname} = validate.data;

        const hashedPassword = await bcrypt.hash(password,5);

        await adminModel.create({
            email:email,
            password:hashedPassword,
            firstname:firstname,
            lastname:lastname
        })

        return res.json({
            msg:"You have signedup as admin"
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Admin Signup Error",
            error: error
        })
    }
})

adminRouter.post('/login',async (req,res)=>{
    try{
        const AdminLoginSchema = z.object({
            email: z.email(),
            password: z.string()
        });

        const validate = AdminLoginSchema.safeParse(req.body);

        if(!validate.success){
            return res.json({
                msg: "Zod validation error",
                error: validate.error
            })
        }

        const { email, password} = validate.data;

        const admin = await adminModel.findOne({
            email:email
        })

        if(!admin){
            return res.status(403).json({
                msg:"Admin with this email does not exist"
            })
        }

        const verify = await bcrypt.compare(password,admin.password);

        if(!verify){
            return res.status(401).json({
                msg: "Invalid Credentials"
            })
        }

        const token = await jwt.sign({id:admin._id},process.env.JWT_ADMIN_PASS);

        return res.json({
            msg:"You have logged in as admin",
            token:token
        })

    } catch (error){
        return res.status(500).json({
            msg: "Admin Login Error",
            error: error
        })
    }
})

adminRouter.post('/course', adminAuthMiddleware ,async (req,res)=>{
    try{
        const CourseInfoSchema = z.object({
            title: z.string().max(100),
            description: z.string().max(1000),
            price: z.number().lte(10000),
            imageurl: z.url()
        })
        
        const validate = CourseInfoSchema.safeParse(req.body);
        
        if(!validate.success){
            return res.status(403).json({
                msg: "Zod validation error",
                error: validate.error
            })
        }

        const { title, description, price, imageurl } = validate.data;
        
        const creatorid = req.adminId;
        
        const course = await courseModel.create({
            title,
            description,
            price,
            imageurl,
            creatorid
        })
        
        return res.json({
            msg:"Created a course",
            course
        })

    } catch (error){
        return res.status(500).json({
            msg: "Posting course error",
            error: error
        })
    }
})

adminRouter.put('/course/:courseid',adminAuthMiddleware,async (req,res)=>{
    try{
        const CourseInfoSchema = zod.object({
            title: z.string().max(100),
            description: z.string().max(1000),
            price: z.number().lte(10000),
            imageurl: z.url()
        })

        const validate = CourseInfoSchema.safeParse(req.body);

        if(!validate){
            return res.status(403).json({
                msg: "Zod validation error",
                error: validate.error
            })
        }

        const { title, description, price, imageurl } = validate.data;
        const courseid = req.params.courseid;

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

    } catch (error){
        return res.status(500).json({
            msg: "Updating Course Error",
            error: error
        })
    }
})

adminRouter.delete('/course/:courseid',adminAuthMiddleware,async (req,res)=>{
    try{
        const courseid = req.params.courseid;

        await courseModel.deleteOne({
            _id:courseid
        })
        
        return res.json({
            msg:"Deleted the course"
        })

    } catch (error){
        return res.status(500).json({
            msg: "Deleting course error",
            error: error
        })
    }
})

adminRouter.get('/course/bulk',adminAuthMiddleware,async (req,res)=>{
    try{
        const adminid = req.adminId;

        const courses = await courseModel.find({
            creatorid:adminid
        })

        return res.json({
            msg:"Got all your created courses",
            courses:courses
        })
        
    } catch (error){
        return res.status(500).json({
            msg: "Getting all admin's courses error",
            error: error
        })
    }
})

export default adminRouter;