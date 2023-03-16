import Student from "../models/student.js";
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
export default studentRepository;