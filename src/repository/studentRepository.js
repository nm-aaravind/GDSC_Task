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
                throw new Error("User already exists")
            }
            console.log(error)
        }
    }
    async getForSignIn(data){
        try {
            const response=await Student.findOne({regno:data.regno})
            if(!response){
                throw new Error("Unregistered user")
            }
            return response;
        } catch (error) {
            if(error.message=='Unregistered user'){
                throw error
            }
            console.log(error)
        }
    }
    async getById(data){
        try {
            const response=await Student.findById(data).populate('courses');
            return response;
        } catch (error) {
            console.log(error)
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
            console.log(error)
        }
    }
}
module.exports=studentRepository;