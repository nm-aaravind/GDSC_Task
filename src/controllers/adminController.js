const adminService=require("../services/adminService");
const AdminService=new adminService();
async function createCourse(req,res){
        try {
            if(!(req.body.courseName && req.body.courseCode && req.body.capacity)){
                return res.status(400).json({
                    message:"Missing mandatory fields",
                    success:false
                })
            }
            const response=await AdminService.createCourse(req.body)
            return res.status(200).json({
                data:response,
                success:true
            })
        } catch (error) {
            return res.status(400).json({
                message:error.message,
                success:false
            })
        }
}
const deleteCourse=async (req,res)=>{
    try {
        if(!(req.body.courseName && req.body.courseCode)){
            return res.status(400).json({
                message:"Missing mandatory fields, check request body",
                success:false
            })
        }
        const response=await AdminService.deleteCourse({
            courseName:req.body.courseName,
            courseCode:req.body.courseCode
        })
        return res.status(200).json({
            message:"Deleted course",
            success:response
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
        if(!(req.body.userid && req.body.password)){
            return res.status(400).json({
                message:"Missing mandatory fields, check request body",
                success:false
            })
        }
        const response=await AdminService.signIn({
            adminuserid:req.body.userid,
            adminpassword:req.body.password
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
const addStudentRegistration=async (req,res)=>{
    try {
        if(!(req.body.registerno && req.body.courseName && req.body.courseCode)){
            return res.status(400).json({
                message:"Missing mandatory fields, check request body",
                success:false
            })
        }
        const response=await AdminService.addStudentRegistration({
            regno:req.body.registerno,
            courseName: req.body.courseName,
            courseCode:req.body.courseCode
        })
        return res.status(200).json({
            data:response,
            success:true
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message,
            success:false
        })
    }
}
const removeStudentRegistration=async(req,res)=>{
    try {
        if(!(req.body.registerno && req.body.courseName && req.body.courseCode)){
            return res.status(400).json({
                message:"Missing mandatory fields, check request body",
                success:false
            })
        }
        const resposne=await AdminService.removeStudentRegistration({
            courseName:req.body.courseName,
            courseCode:req.body.courseCode,
            regno:req.body.registerno
        })
        return res.status(200).json({
            message:"Successfully removed student from course",
            success:true
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message,
            success:false
        })
    }
}
module.exports={
    createCourse,signIn,deleteCourse,addStudentRegistration,removeStudentRegistration
};