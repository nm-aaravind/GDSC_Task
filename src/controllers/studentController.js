const studentService=require("../services/studentService")
const pw=require("../utils/encrypt-decrypt")
const StudentService=new studentService();
const signUp=async (req,res)=>{
    try {
        const response=await StudentService.createStudent({
            regno:req.body.registerno,
            password:pw.encryptPassword(req.body.password)
        })
        return res.status(200).json({
            data:response,
            success:true
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false
        })
    }
}
const signIn=async (req,res)=>{
    try {
        const response=await StudentService.getForSignIn({
            regno:req.body.registerno,
            password:req.body.password
        })
        return res.status(200).json({
            token:response,
            success:true
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false
        })
    }
}
const registerCourse=async (req,res)=>{
    try {
        const response=await StudentService.registerCourse({
            
        })
    } catch (error) {
        
    }
}
module.exports={
    signUp,signIn,registerCourse
}