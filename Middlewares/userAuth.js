import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userAuthMiddleware = async (req,res,next)=>{

    const authorization = req.headers.authorization;

    const jwtToken = authorization.split(" ")[1];

    const decoded = await jwt.verify(jwtToken,process.env.JWT_USER_PASS);

    if(decoded){
        req.userId = decoded.id;
        next();
        return;
    } 

    res.status(401).json({
        msg:"Authentication Failed for user"
    })
}

export default userAuthMiddleware;