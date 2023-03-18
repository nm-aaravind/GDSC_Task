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
            if(error.message=='User already exists'){
                throw error;
            }
            console.log(error)
        }
    }
    async getForSignIn(data){
        try {
            const response=await this.StudentRepository.getForSignIn(data);
            if(!(pw.checkPassword(response.password,data.password))){
                throw new Error("Invalid password");
            }
            const token=this.createToken({
                regno:response.regno,
                id:response._id
            });
            return token;
        } catch (error) {
            if(error.message=='Unregistered user' || error.message=='Invalid password'){
                throw error;
            }
            console.log(error)
        }
    }
    async getById(data){
        try {
            const response=await this.StudentRepository.getById(data);
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    async registerCourse(data){
        try {
            const response=await this.CourseRepository.registerCourse(data);
            return response
        } catch (error) {
            if(error.message=='Already registered' || error.message=="No course exists"){
                throw error
            }
            console.log(error)
        }
    }
    async listCourses(){
        try {
            const response=await this.CourseRepository.listCourses();
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    async viewRegisteredCourses(data){
        try {
            const response=await this.StudentRepository.viewRegisteredCourses(data);
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    createToken(data){
        try {
            const token=jwt.sign(data,JWT_SALT,{expiresIn:'1h'})
            return token;
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=studentService;