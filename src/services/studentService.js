const DefinedError=require("../utils/error")
const studentRepository=require("../repository/studentRepository");
const courseRepository=require("../repository/courseRepository")
const pw=require("../utils/encrypt-decrypt")
const jwt=require('jsonwebtoken');
const { JWT_SALT } = require("../config/dotenv");
class studentService{
    constructor(){
        this.StudentRepository=new studentRepository();
        this.CourseRepository=new courseRepository();
    }
    async createStudent(data){
        try {
            const response=await this.StudentRepository.createStudent(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getForSignIn(data){
        try {
            const response=await this.StudentRepository.getForSignIn(data);
            if(!(pw.checkPassword(response.password,data.password))){
                throw new DefinedError("Invalid password",401);
            }
            const token=this.createToken({
                regno:response.regno,
                id:response._id
            });
            return token;
        } catch (error) {
            throw error;
        }
    }
    async getById(data){
        try {
            const response=await this.StudentRepository.getById(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async registerCourse(data){
        try {
            const response=await this.CourseRepository.registerCourse(data);
            return response
        } catch (error) {
            throw error;
        }
    }
    async addStudentRegistration(data){
        try {
            const student=await this.StudentRepository.getByRegno(data.regno)
            if(!student){
                throw new DefinedError("Student Not Found",404)
            }
            else{
                const response=this.registerCourse({...data,id:student.id})
                return response;
            }
        } catch (error) {
            throw error;
        }
    }
    
    async listCourses(){
        try {
            const response=await this.CourseRepository.listCourses();
            return response;
        } catch (error) {
            throw error;
        }
    }
    async viewRegisteredCourses(data){
        try {
            const response=await this.StudentRepository.viewRegisteredCourses(data);
            return response;
        } catch (error) {
            throw error;
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
module.exports=studentService;