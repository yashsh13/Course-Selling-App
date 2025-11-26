import { Router } from "express";

const courseRouter = Router();

courseRouter.get('/viewall',(req,res)=>{
    return res.json({
        msg:"Listed all the course available"
    })
})

courseRouter.post('/buy',(req,res)=>{
    return res.json({
        msg:"You have purchased the course"
    })
})

export default courseRouter;