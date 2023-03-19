const DefinedError=require("../utils/error")
const courseRepository=require("../repository/courseRepository");
const studentRepository=require("../repository/studentRepository");
const studentService=require("../services/studentService")
const jwt=require("jsonwebtoken")
const {ADMIN_USER_ID,ADMIN_PASSWORD,JWT_SALT}=require("../config/dotenv");
class adminService{
    constructor(){
        this.CourseRepository=new courseRepository();
        this.StudentRepository=new studentRepository();
        this.StudentService=new studentService();
    }
    async signIn(data){
        try {
            if(!(data.adminuserid==ADMIN_USER_ID && data.adminpassword==ADMIN_PASSWORD)){
                throw new DefinedError("Unauthorized user",401)
            }
            const token=this.createToken({
                adminuserid:data.adminuserid,
                adminpassword:data.adminpassword
            });
            return token;
        } catch (error) {
            throw error;
        }
    }
    async createCourse(data){
        try {
            const response=await this.CourseRepository.createCourse(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async editCourse(data){
        try {
            const response=await this.CourseRepository.editCourse(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async deleteCourse(data){
        try {
            const response=await this.CourseRepository.deleteCourse(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async addStudentRegistration(data){
        try {
            const response=await this.StudentService.addStudentRegistration(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async removeStudentRegistration(data){
        try {
            const response=await this.CourseRepository.removeStudentRegistration(data);
            return response;
        } catch (error) {
            throw error
        }
    }
    createToken(data){
        try {
            const token=jwt.sign(data,JWT_SALT,{expiresIn:'1h'})
            return token;
        } catch (error) {
            throw error;
        }
    }
}
module.exports=adminService;