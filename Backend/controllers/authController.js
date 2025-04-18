import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const Admin = {
    username: "Robo",
    password: "roboMania25"
}

const generateAccess = ()=>{
    return jwt.sign({username:Admin.username},process.env.JWT_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}

const generateRefresh = ()=>{
    return jwt.sign({username:Admin.username},process.env.REFRESH_TOKEN_SECRET,{expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

const login=async(req,res)=>{
    try{
        const {username, password} = req.body
        if(!username || !password)
            return res.status(400).json({message:"username and password are required"});
        if(username===Admin.username && password===Admin.password){
            const accessToken = generateAccess();
            const refreshToken = generateRefresh();
            const options={
                httpOnly: true,
                secure: false,
                sameSite: "none",
                maxAge: 15 * 60 * 1000,
            }
            res.cookie('refreshToken', refreshToken, options).cookie('accessToken', accessToken,options).json({accessToken,Admin:Admin})
        }
        else{
            return res.status(401).json({message:"Invalid credentials"})
        }
        
    }catch(err){
        console.error("Login error: ", err)
        return res.status(500).json({message: "Internal server error", error:err.message});
    }
}

const logout = (req,res)=>{
    if(!req.cookies.refreshToken)
        return res.status(400).json({error:`Already logged out`});
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    }
    return res.clearCookie("refreshToken",options).clearCookie("accessToken",options).json({message:"Logged out successfully"});
}

export {login,logout};