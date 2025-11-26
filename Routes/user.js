import { Router } from "express";
import { userModel } from "../db.js";

const userRouter = Router();

userRouter.post('/signup',(req,res)=>{
    return res.json({
        msg:"You have signed up as user"
    })
})

userRouter.post('/login',(req,res)=>{
    return res.json({
        msg:"You have logged in as user"
    })
})

userRouter.get('/purchased',(req,res)=>{
    return res.json({
        msg:"Listed all the courses you have bought"
    })
})

export default userRouter;