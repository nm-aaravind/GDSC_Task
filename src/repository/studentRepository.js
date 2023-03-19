const DefinedError=require("../utils/error")
const Student=require("../models/student")
const Course=require("../models/course")
class studentRepository{
    async createStudent(data){
        try {
            const response=await Student.create(data);
            return {
                regno:response.regno,
                courses:response.courses,
                id:response.id
            };
        } catch (error) {
            if(error.message.match('E11000 duplicate key error collection:')){
                throw new DefinedError("User already exists",500)
            }
            throw error
        }
    }
    async getForSignIn(data){
        try {
            const response=await Student.findOne({regno:data.regno})
            if(!response){
                throw new DefinedError("Unregistered user",401)
            }
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getById(data){
        try {
            const response=await Student.findById(data).populate('courses');
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getByRegno(data){
        try {
            const response=await Student.findOne({
                regno:data
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
    async viewRegisteredCourses(data){
        try {
            const response=await Student.findById(data).populate('courses');
            let result=response.courses.map((element)=>{
                return {courseName:element.courseName,courseCode:element.courseCode}
            });
            return result;
        } catch (error) {
            throw error
        }
    }
}
module.exports=studentRepository;