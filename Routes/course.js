import { Router } from "express";
import { courseModel, purchasedModel } from "../db.js";
import userAuthMiddleware from "../Middlewares/userAuth.js";

const courseRouter = Router();

courseRouter.get('/viewall',async (req,res)=>{

    const courses = await courseModel.find({});
    
    return res.json({
        msg:"Listed all the course available",
        courses:courses
    })
})

courseRouter.post('/buy/:courseid',userAuthMiddleware,async (req,res)=>{

    const courseid = req.params.courseid;

    const userid = req.userId;

    await purchasedModel.create({
        userid,
        courseid
    })

    return res.json({
        msg:"You have purchased the course"
    })
})

export default courseRouter;