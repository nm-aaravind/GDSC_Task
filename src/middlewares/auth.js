const jwt=require("jsonwebtoken")
const studentService=require('../services/studentService')
const {ADMIN_PASSWORD,ADMIN_USER_ID,JWT_SALT}=require('../config/dotenv')
let nn=new studentService();
async function verifyTokenStudent(req,res,next){
    try {
        const token=req.headers.authorization
        if(!token){
            throw new Error("No token received")
        }
        const result=jwt.verify(token.substring(7),JWT_SALT);
            const response=await nn.getById(result.id)
            if(response){
                req.body={...req.body,...result};
                next();
            }
            else{
                return res.json({
                    message:'No such user exists',
                    success:false
                })
            }
    } catch (error) {
        if(error.name=='JsonWebTokenError'){
            return res.status(400).json({
                message:'Invalid/Malformed/Missing signature of the token',
                success:false
            })
        }
        if(error.message=='jwt expired'){
            return res.status(400).json({
                message:"Token expired, login again",
                success:false
            })
        }
        if(error.message=="No token received"){
            return res.status(400).json({
                message:"No token received",
                success:false
            })
        }
        console.log(error)
    }
}
async function verifyTokenAdmin(req,res,next){
    try {
        const token=req.headers.authorization
        if(!token){
            throw new Error("No token received")
        }
        const result=jwt.verify(token.substring(7),JWT_SALT);
        if(result.adminuserid==ADMIN_USER_ID && result.adminpassword==ADMIN_PASSWORD){
            next();
        }
        else{
            return res.status(400).json({
                message:"Unauthorized access",
                success:false
            })
        }
    } catch (error) {
        if(error.name=='JsonWebTokenError'){
            return res.status(400).json({
                message:'Invalid/Malformed/Missing signature of the token',
                success:false
            })
        }
        if(error.message=='jwt expired'){
            return res.status(400).json({
                message:"Token expired, login again",
                success:false
            })
        }
        if(error.message=="No token received"){
            return res.status(400).json({
                message:"No token received",
                success:false
            })
        }
        console.log(error)
    }
}
module.exports={
    verifyTokenStudent,verifyTokenAdmin
}