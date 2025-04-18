import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const Admin = {
    username: "Robo",
    password: "roboMania25"
}

const verifyJWT = async(req,res,next)=>{
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            return res.status(401).json({message:"Unauthorized accesss"});
        }
        const info = jwt.verify(token,process.env.JWT_SECRET);
        if(info.username!=="Robo")
            return res.status(403).json({message:"Forbidden invalid admin access"});
        req.user = Admin;
        next();
    }catch(err)
    {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

export {verifyJWT}