import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const adminAuthMiddleware = async (req,res,next)=>{

    const authorization = req.headers.authorization;

    const jwtToken = authorization.split(" ")[1];
    
    const decoded = await jwt.verify(jwtToken,process.env.JWT_ADMIN_PASS);
    
    if(decoded){
        req.adminId = decoded.id;
        next();
        return;
    }

    res.status(401).json({
        msg:"Authentication Failed for admin"
    })
}

export default adminAuthMiddleware;