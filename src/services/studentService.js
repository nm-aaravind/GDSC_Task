const studentRepository=require("../repository/studentRepository");
const courseRepository=require("../repository/courseRepository")
const pw=require("../utils/encrypt-decrypt")
const jwt=require('jsonwebtoken')
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
            console.log(error)
        }
    }
    async getForSignIn(data){
        try {
            const response=await this.StudentRepository.getForSignIn(data);
            console.log(response)
            if(!response){
                throw new Error("Unregistered user")
            }
            if(!(pw.checkPassword(response.password,data.password))){
                throw new Error("Invalid pw");
            }
            const token=this.createToken({
                regno:response.regno,
                id:response._id
            });
            return token;
        } catch (error) {
            console.log(error)
        }
    }
    async registerCourse(data){
        try {
            const response=await this.CourseRepository.registerCourse(data);
            return response
        } catch (error) {
            console.log(error)
        }
    }
    createToken(data){
        try {
            console.log(data)
            const token=jwt.sign(data,"SALT",{expiresIn:'1h'})
            return token;
        } catch (error) {
            console.log(error)
        }
    }
    verifyToken(req,res,next){
        try {
            const token=req.headers.authorization
            console.log(token);
            const result=jwt.verify(token,"SALT");
            
            if(result){
                next()
            }
            else{
                return res.json({
                    message:false
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=studentService;