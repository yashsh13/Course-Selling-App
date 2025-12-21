import { Router } from "express";
import { userModel, purchasedModel, courseModel } from "../db.js";
import userAuthMiddleware from "../Middlewares/userAuth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const userRouter = Router();

userRouter.post('/signup',async (req,res)=>{
    try{
        const UserSignupSchema = z.object({
            email: z.email(),
            password: z.string().min(3).max(15),
            firstname: z.string(),
            lastname: z.string()
        })

        const validate = UserSignupSchema.safeParse(req.body);

        if(!validate.success){
            return res.status(403).json({
                msg:"Zod validation failed",
                error:validate.error
            })
        }

        const { email, password, firstname, lastname } = validate.data;
        const hashedPassword = await bcrypt.hash(password,5);

        await userModel.create({
            email:email,
            password:hashedPassword,
            firstname:firstname,
            lastname:lastname
        })

        return res.json({
            msg:"You have signed up as user"
        })

    } catch (error) {
        return res.json({
            msg: "User Signup error",
            error: error
        })
    }
})

userRouter.post('/login',async (req,res)=>{
    try{
        const UserLoginSchema = z.object({
            email: z.email(),
            password: z.string()
        })

        const validate = UserLoginSchema.safeParse(req.body);

        if(!validate.success){
            return res.status(403).json({
                msg:"Zod validation failed",
                error:validate.error
            });
        }

        const { email, password } = validate.data;

        const user = await userModel.findOne({
            email:email
        })

        if(!user){
            return res.status(403).json({
                msg:"User with this email does not exist"
            })
        }

        const verify = await bcrypt.compare(password,user.password);

        if(!verify){
            return res.status(403).json({
                msg:"Invalid Credentials"
            })
        }

        const token = await jwt.sign({id:user._id},process.env.JWT_USER_PASS);

        return res.json({
            msg:"You have logged in as user",
            token:token
        })

    } catch (error) {
        return res.json({
            msg:"User Login Error",
            error:error
        })
    }
})

userRouter.get('/purchased',userAuthMiddleware,async (req,res)=>{
    try{
        const userid = req.userId;

        const allPurchases = await purchasedModel.find({
            userid:userid
        })

        const allCourseIds = allPurchases.map(function(object){
            return object.courseid;
        });

        const courses = await courseModel.find({
            _id:{"$in":allCourseIds}
        });

        return res.json({
            msg:"Listed all the courses you have bought",
            courses:courses
        })

    } catch (error) {
        return res.json({
            msg: "Getting user purchased courses error",
            error: error
        })
    }
})

export default userRouter;