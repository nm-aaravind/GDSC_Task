const courseRepository=require("../repository/courseRepository");
const jwt=require("jsonwebtoken")
const {ADMIN_USER_ID,ADMIN_PASSWORD,JWT_SALT}=require("../config/dotenv")
class adminService{
    constructor(){
        this.CourseRepository=new courseRepository();
    }
    async signIn(data){
        try {
            if(!(data.adminuserid==ADMIN_USER_ID && data.adminpassword==ADMIN_PASSWORD)){
                throw new Error("Unauthorized user")
            }
            const token=this.createToken({
                adminuserid:data.adminuserid,
                adminpassword:data.adminpassword
            });
            return token;
        } catch (error) {
            if(error.message=='Unauthorized user'){
                throw error;
            }
            console.log(error)
        }
    }
    async createCourse(data){
        try {
            const response=await this.CourseRepository.createCourse(data);
            return response;
        } catch (error) {
            if(error.message=='Duplicate course entry'){
                throw error;
            }
            console.log(error)
        }
    }
    async editCourse(data){
        try {
            const response=await this.CourseRepository.editCourse(data);
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    async deleteCourse(data){
        try {
            const response=await this.CourseRepository.deleteCourse(data);
            return response;
        } catch (error) {
            if(error.message=='No such course exists'){
                throw error
            }
            console.log(error)
            throw error;
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
module.exports=adminService;