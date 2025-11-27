import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userAuthMiddleware = async (req,res,next)=>{

    const token = req.headers.token;

    const decode = await jwt.verify(token,process.env.JWT_PASS);

    if(decode){
        req.userId = decoded.id;
        next();
    } 

    res.status(401).json({
        msg:"Authentication Failed"
    })
}

export default userAuthMiddleware;