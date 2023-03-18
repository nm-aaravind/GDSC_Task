const adminService=require("../services/adminService");
const AdminService=new adminService();
async function createCourse(req,res){
        try {
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
        const response=await AdminService.deleteCourse({
            courseName:req.body.courseName,
            courseCode:req.body.courseCode
        })
        return res.status(200).json({
            message:"Deleted course",
            success:response
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message,
            success:false
        })
    }
}
const signIn=async (req,res)=>{
    try {
        const response=await AdminService.signIn({
            adminuserid:req.body.userid,
            adminpassword:req.body.password
        })
        return res.status(200).json({
            token:response,
            success:true
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message,
            success:false
        })
    }
}
const addStudentRegistration=async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
const removeStudentRegistration=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
module.exports={
    createCourse,signIn,deleteCourse,addStudentRegistration,removeStudentRegistration
};