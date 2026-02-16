import { Router } from "express";
import { courseModel, purchasedModel } from "../db.js";
import userAuthMiddleware from "../Middlewares/userAuth.js";

const courseRouter = Router();

courseRouter.get('/viewall',async (req,res)=>{
    try{
        const courses = await courseModel.find({});
    
        return res.json({
            msg:"Listed all the course available",
            courses:courses
        })

    } catch (error){
        return res.status(500).json({
            msg: "Fetching all available courses error",
            error: error
        })
    }
})

courseRouter.post('/buy/:courseid',userAuthMiddleware,async (req,res)=>{
    try{
        const courseid = req.params.courseid;

        const userid = req.userId;

        await purchasedModel.create({
            userid,
            courseid
        })

        return res.json({
            msg:"You have purchased the course"
        })

    } catch (error){
        return res.status(500).json({
            msg: "Error in buying a course",
            error: error
        })
    }
})

export default courseRouter;