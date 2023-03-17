const Student=require("../models/student")
class studentRepository{
    async createStudent(data){
        try {
            const response=await Student.create(data);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    async getForSignIn(data){
        try {
            const response=await Student.findOne({regno:data.regno})
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    async viewCourses(){
        try {
            
        } catch (error) {
            
        }
    }
    async registerCourse(){
        try {
            
        } catch (error) {
            
        }
    }
    async viewRegisteredCourses(){
        try {
            
        } catch (error) {
            
        }
    }
}
module.exports=studentRepository;