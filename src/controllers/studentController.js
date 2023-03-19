const studentService=require("../services/studentService")
const pw=require("../utils/encrypt-decrypt")
const StudentService=new studentService();
const signUp=async (req,res)=>{
    try {
        if(!(req.body.registerno && req.body.password)){
            return res.status(400).json({
                message:"Missing mandatory field, check request body",
                success:false
            })
        }
        const response=await StudentService.createStudent({
            regno:req.body.registerno,
            password:pw.encryptPassword(req.body.password)
        })
        return res.status(200).json({
            data:response,
            success:true
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            message:error.message,
            success:false
        })
    }
}
const signIn=async (req,res)=>{
    try {
        if(!(req.body.registerno && req.body.password)){
            return res.status(400).json({
                message:"Missing mandatory field, check request body",
                success:false
            })
        }
        const response=await StudentService.getForSignIn({
            regno:req.body.registerno,
            password:req.body.password
        })
        return res.status(200).json({
            token:response,
            success:true
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            message:error.message,
            success:false
        })
    }
}
const registerCourse=async (req,res)=>{
    try {
        if(!(req.body.courseName && req.body.courseCode)){
            return res.status(400).json({
                message:"Missing mandatory fields, check request body",
                success:false
            })
        }
        const response=await StudentService.registerCourse({
            courseName:req.body.courseName,
            courseCode:req.body.courseCode,
            regno:req.body.regno,
            id:req.body.id
        })
        return res.status(200).json({
            data:response,
            success:true
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            error:error.message,
            success:false
        })
    }
}
const listCourses=async (req,res)=>{
    try {
        const response=await StudentService.listCourses();
        return res.status(200).json({
            courses:response,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}
const viewRegisteredCourses=async (req,res)=>{
    try {
        const response=await StudentService.viewRegisteredCourses(req.body.id)
        return res.status(200).json({
            data:response,
            success:true
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message,
            success:false
        })
    }
}
module.exports={
    signUp,signIn,registerCourse,listCourses,viewRegisteredCourses
}