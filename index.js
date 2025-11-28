import express from "express";
import userRouter from "./Routes/user.js";
import courseRouter from "./Routes/course.js";
import adminRouter from "./Routes/admin.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const app = express();

app.use(express.json());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/course',courseRouter);
app.use('/api/v1/admin',adminRouter);

async function main(){
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(3000);
    console.log("Running on port 3000")
}

main();