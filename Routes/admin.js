import { Router } from "express";

const adminRouter = Router();

adminRouter.post('/signup',(req,res)=>{
    return res.json({
        msg:"You have signedup as admin"
    })
})

adminRouter.post('/login',(req,res)=>{
    return res.json({
        msg:"You have logged in as admin"
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